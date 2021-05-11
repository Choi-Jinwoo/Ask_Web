import { InquiryInput } from 'components/auditor/inquiry-input';
import { useInputText } from 'hooks/input.hook';
import { useToggle } from 'hooks/toggle.hook';
import { observer } from 'mobx-react';

export const SendInquiryContainer = observer(() => {
  const [isAnonymous, toggleAnonymous] = useToggle(false);
  const [content, onContentChange, clearContent] = useInputText('');

  return (
    <>
      <InquiryInput
        isAnonymous={isAnonymous}
        toggleAnonymous={toggleAnonymous}
        content={content}
        onContentChange={onContentChange}
      />
    </>
  )
});