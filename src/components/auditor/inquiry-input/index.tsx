import { Button } from 'components/common/button';
import { Text } from 'components/common/text';
import Toggle from 'react-toggle';

import 'styles/toggle.css';
import './index.scss';

type Props = {
  isAnonymous: boolean;
  toggleAnonymous: () => void;
  content: string;
  onContentChange: (e: any) => void;
}

export const InquiryInput = ({
  isAnonymous,
  toggleAnonymous,
  content,
  onContentChange,
}: Props) => {

  return (
    <div className='inquiryInput'>
      <div className='inquiryInput-anonymous'>
        <Toggle checked={isAnonymous} onChange={toggleAnonymous} />
        <Text className='inquiryInput-anonymous-info' size='1.25rem'>익명</Text>
      </div>

      <textarea
        className='inquiryInput-content'
        placeholder='질문을 남겨주세요'
        value={content}
        onChange={onContentChange}
      />

      <Button>전송</Button>
    </div>
  )
}