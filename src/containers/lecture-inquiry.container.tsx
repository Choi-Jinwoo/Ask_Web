import { InquiryItem } from 'components/inquiry/inquiry-item';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useStores } from 'stores/use-stores';

export const LectureInquiryContainer = observer(() => {
  const { inquiryStore } = useStores();
  const history = useHistory();

  const inquiryItems = inquiryStore.inquiries.map((inquiry, index) => {
    return (
      <InquiryItem inquiry={inquiry} key={index} />
    )
  });

  const adminCode: string = useMemo(() => {
    const adminCode = adminCodeStorage.get();
    if (adminCodeStorage === null) {
      alert('다시 로그인 해주세요');
      history.push('/');
    }

    return adminCode as string;
  }, [history]);

  const handleScrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.body.scrollHeight
    })
  }, [])

  const handleReceiveInquiry = useCallback((data) => {
    const { inquiry } = data.data;
    const shouldScrollToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    inquiryStore.addInquiry(inquiry)
    if (shouldScrollToBottom) {
      handleScrollToBottom();
    }
  }, [handleScrollToBottom, inquiryStore])

  const handleFetchInquiries = useCallback((): Promise<void> => {
    return inquiryStore.fetch(adminCode);
  }, [adminCode, inquiryStore]);

  // 데이터 Fetch
  useEffect(() => {
    handleFetchInquiries()
      .then(() => {
        handleScrollToBottom();
      })
  }, [adminCode, handleFetchInquiries, handleReceiveInquiry, handleScrollToBottom, history, inquiryStore])

  // 소켓 이벤트 Emit & 이벤트 리스너 등록
  useEffect(() => {
    inquiryEmitter.joinLecturer(adminCode);
    InquirySocketSingleton.instance.setOnReceiveInquiry(handleReceiveInquiry);
  }, [adminCode, handleReceiveInquiry]);

  useEffect(() => {
    let isLoading = false;

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight;

      if (scrollTop <= 0) {
        if (!isLoading) {
          isLoading = true;

          handleFetchInquiries()
            .then(() => {
              document.documentElement.scrollTo({
                top: document.documentElement.scrollHeight - height,
              });
              isLoading = false;
            });
        }
      }
    })
  }, [handleFetchInquiries])

  return (
    <div>
      {inquiryItems}
    </div>
  );
});