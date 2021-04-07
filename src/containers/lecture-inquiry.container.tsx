import { InquiryItem } from 'components/inquiry/inquiry-item';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useStores } from 'stores/use-stores';

export const LectureInquiryContainer = observer(() => {
  const { inquiryStore } = useStores();
  const history = useHistory();

  const inquiryItems = inquiryStore.inquiries.map((inquiry) => {
    return (
      <InquiryItem inquiry={inquiry} />
    )
  });

  const handleScrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.body.scrollHeight
    })
  }, [])

  const handleReceiveInquiry = useCallback((data) => {
    const { inquiry } = data.data;

    inquiryStore.addInquiry(inquiry)
    handleScrollToBottom();
  }, [handleScrollToBottom, inquiryStore])

  useEffect(() => {
    const adminCode = adminCodeStorage.get();

    if (adminCode === null) {
      alert('다시 로그인해주세요');
      history.push('/');
      return;
    }

    inquiryEmitter.joinLecturer(adminCode);

    InquirySocketSingleton.instance.setOnReceiveInquiry(handleReceiveInquiry);

    inquiryStore.fetch(adminCode)
      .then(() => {
        handleScrollToBottom();
      })
  }, [handleReceiveInquiry, handleScrollToBottom, history, inquiryStore])

  return (
    <div>
      {inquiryItems}
    </div>
  );
});