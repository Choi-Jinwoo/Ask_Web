import { Text } from 'components/common/text';
import { useMemo } from 'react';
import { colors } from 'styles/colors';
import { IInquiry } from 'types/inquiry.interface';
import { formatDate } from 'utils/date/date.util';

import './index.scss';

type Props = {
  inquiry: IInquiry,
}

export const InquiryItem = ({
  inquiry
}: Props) => {
  const { content, user, createdAt } = inquiry;

  const formattedDate = useMemo(() => {
    return formatDate(createdAt);
  }, [createdAt]);

  return (
    <div className='inquiryItem'>
      <div className='inquiryItem-profileImageWrapper'>
        <img
          className='inquiryItem-profileImage'
          src='http://dodam.b1nd.com/api/image/jpeg/1F82BA1B-E4AF-47FE-984B-67ED0E62A69E.jpeg' alt='' />
      </div>

      <div className='inquiryItem-content'>
        <div className='inquiryItem-content-profile'>
          <Text weight='bold' size='1.25rem'>최진우</Text>
          <Text
            className='inquiryItem-content-profile-classroom'
          >3학년 1반 19번</Text>
        </div>

        <div className='inquiryItem-content-inquiry'>
          {content}
        </div>

        <div className='inquiryItem-content-time'>
          <Text
            size='small'
            color={colors.darkerGray}
          >{formattedDate}</Text>
        </div>
      </div>
    </div>
  )
}