import { InquiryInput } from 'components/auditor/inquiry-input';
import { useInputText } from 'hooks/input.hook';
import { useToggle } from 'hooks/toggle.hook';
import { observer } from 'mobx-react';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { lectureStorage } from 'storage/lecture.storage';
import { tokenStorage } from 'storage/token.storage';
import { useStores } from 'stores/use-stores';

export const SendInquiryContainer = observer(() => {
  const [isAnonymity, toggleAnonymity] = useToggle(false);
  const [content, onContentChange, clearContent] = useInputText('');
  const history = useHistory();

  const { inquiryStore } = useStores();

  const handleSendInquiry = useCallback(() => {
    if (content.trim().length <= 0) {
      alert('내용을 입력해주세요');
      return;
    }

    if (inquiryStore.lecture !== null) {
      inquiryEmitter.sendInquiry({
        content,
        isAnonymity,
        lectureId: inquiryStore.lecture.id,
      });
      clearContent();
    }
  }, [clearContent, content, inquiryStore.lecture, isAnonymity]);

  useEffect(() => {
    if (!tokenStorage.hasItem()) {
      alert('다시 로그인 해주세요');
      history.push('/');
    } else if (lectureStorage.hasItem()) {
      inquiryStore.lecture = lectureStorage.get();
    }
  }, [history, inquiryStore]);

  return (
    <>
      <InquiryInput
        handleSendInquiry={handleSendInquiry}
        isAnonymity={isAnonymity}
        toggleAnonymity={toggleAnonymity}
        content={content}
        onContentChange={onContentChange}
      />
    </>
  )
});