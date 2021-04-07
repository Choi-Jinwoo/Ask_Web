import { Text } from 'components/common/text';
import { colors } from 'styles/colors';

import './index.scss';

export const InquiryItem = () => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maxime laudantium itaque consequuntur. Vero nobis asperiores ducimus porro vitae earum! Consectetur quibusdam in consequatur fuga obcaecati nihil, doloremque aperiam. Molestias.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maxime laudantium itaque consequuntur. Vero nobis asperiores ducimus porro vitae earum! Consectetur quibusdam in consequatur fuga obcaecati nihil, doloremque aperiam. Molestias.
        </div>

        <div className='inquiryItem-content-time'>
          <Text
            size='small'
            color={colors.darkerGray}
          >3분전</Text>
        </div>
      </div>
    </div>
  )
}