import { InquiryItem } from 'components/inquiry/inquiry-item';
import { MessageList } from 'components/inquiry/message-list';
import { MessageItem } from 'components/inquiry/message-item';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useStores } from 'stores/use-stores';
import { IInquiry } from 'types/inquiry.interface';
import { PinnedInquiryModal } from 'components/inquiry/pinned-inquiry-modal';
import { lectureStorage } from 'storage/lecture.storage';

export const LectureInquiryContainer = observer(() => {
  const refs = useRef<HTMLDivElement>(null);

  const { inquiryStore } = useStores();
  const history = useHistory();

  const [pinnedInquiry, setPinnedInquiry] = useState<IInquiry | null>(null);

  const adminCode: string = useMemo(() => {
    const adminCode = adminCodeStorage.get();
    if (adminCodeStorage === null) {
      alert('다시 로그인 해주세요');
      history.push('/');
    }

    return adminCode as string;
  }, [history]);

  const handlePinInquiry = useCallback((inquiry: IInquiry) => {
    setPinnedInquiry(inquiry);
  }, []);

  const handleUnpinInquiry = useCallback(() => {
    setPinnedInquiry(null);
  }, [])

  const shouldScrollToBottom = useCallback((): boolean => {
    if (refs.current === null) return false;

    return refs.current.clientHeight + refs.current.scrollTop >= refs.current.scrollHeight;
  }, [refs]);

  const handleScrollToBottom = useCallback(() => {
    refs.current!.scrollTo({
      top: refs.current!.scrollHeight
    })
  }, [])

  const handleReceiveInquiry = useCallback((data) => {
    const { inquiry } = data.data;

    const shouldScroll = shouldScrollToBottom();
    inquiryStore.addInquiry(inquiry)

    if (shouldScroll) {
      handleScrollToBottom();
    }
  }, [handleScrollToBottom, inquiryStore, shouldScrollToBottom])

  const handleFetchInquiries = useCallback((): Promise<void> => {
    return inquiryStore.fetch(adminCode);
  }, [adminCode, inquiryStore]);

  const inquiryItems = inquiryStore.inquiries.map((inquiry, index) => {
    return (
      <MessageItem key={index}>
        <InquiryItem inquiry={inquiry} handlePinInquiry={handlePinInquiry} />
      </MessageItem>
    )
  });

  // 데이터 Fetch
  useEffect(() => {
    handleFetchInquiries()
      .then(() => {
        handleScrollToBottom();
      })
  }, [adminCode, handleFetchInquiries, handleReceiveInquiry, handleScrollToBottom, history, inquiryStore])

  // 소켓 이벤트 Emit & 이벤트 리스너 등록
  useEffect(() => {
    InquirySocketSingleton.instance.onReceiveInquiry = handleReceiveInquiry;
    inquiryEmitter.joinLecturer(adminCode);
  }, [adminCode, handleReceiveInquiry]);

  // 스크롤 이벤트 지정
  useEffect(() => {
    let isLoading = false;
    refs.current!.addEventListener('scroll', () => {
      const scrollTop = refs.current!.scrollTop;
      const height = refs.current!.scrollHeight;

      if (scrollTop <= 0) {
        if (!isLoading) {
          isLoading = true;

          setTimeout(() => {
            handleFetchInquiries()
              .then(() => {
                refs.current!.scrollTo({
                  top: refs.current!.scrollHeight - height,
                });
                isLoading = false;
              });
          }, 500)
        }
      }
    })
  }, [handleFetchInquiries])

  useEffect(() => {
    if (!adminCodeStorage.hasItem()) {
      alert('다시 로그인 해주세요');
      history.push('/');
    } else if (lectureStorage.hasItem()) {
      inquiryStore.lecture = JSON.parse(lectureStorage.get() as string);
    }
  }, [history, inquiryStore])

  return (
    <>
      <PinnedInquiryModal inquiry={pinnedInquiry} handleUnPinInquiry={handleUnpinInquiry} />
      < MessageList messageItems={inquiryItems} refs={refs} />
    </>
  );
});