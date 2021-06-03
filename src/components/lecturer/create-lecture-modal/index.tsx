import { Modal } from 'components/common/modal';
import { Text } from 'components/common/text';
import { Button } from 'components/common/button';
import { RiFileCopyLine } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import './index.scss';
import { colors } from 'styles/colors';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
}

export const CreateLectureModal = ({
  isOpen,
  handleClose,
}: Props) => {
  return (
    <Modal
      title='강의 생성'
      isOpen={isOpen}
      close={handleClose}
      maxWidth='400px'
      width='90%'
      height='480px'
    >
      <div className='createLectureModal'>
        <div className='createLectureModal-info'>
          <AiOutlineInfoCircle color={colors.darkBlue} />
          <div className='createLectureModal-info-textWrapper'>
            <Text tag='p' size='0.75rem' color={colors.darkBlue}>참여 코드, 관리자 번호 확인 후 닫아주세요</Text>
            <Text tag='p' size='0.75rem' color={colors.darkBlue}>참여 코드와 관리자 번호는 단 한번만 제공됩니다</Text>
          </div>
        </div>

        <div className='createLectureModal-inputWrapper'>
          <Text weight='bold' size='small'>강의 제목</Text>
          <input
            // value={''}
            // onChange={onIdChange}
            className='createLectureModal-title'
            placeholder='강의 제목을 입력해주세요'
            type='text'
          />
        </div>

        <div className='createLectureModal-inputWrapper'>
          <Text weight='bold' size='small'>강사명</Text>
          <input
            // value={pw}
            // onChange={onPwChange}
            className='createLectureModal-lecturer'
            placeholder='강사명을 입력해주세요'
            type='password'
          />
        </div>

        <div className='createLectureModal-buttonWrapper'>
          <Button
            onClick={(e) => { }}
          >생성</Button>
        </div>

        <div className='createLectureModal-resultBox'>
          <Text size='small' weight='bold'>참여 코드</Text>
          <div className='createLectureModal-codeWrapper'>
            <Text size='small' weight='bold' color={colors.darkerGray}>1234</Text>
            <RiFileCopyLine color={colors.darkerGray} cursor='pointer' />
          </div>
        </div>

        <div className='createLectureModal-resultBox'>
          <Text size='small' weight='bold'>관리자 번호</Text>
          <div className='createLectureModal-codeWrapper'>
            <Text size='small' weight='bold' color={colors.darkerGray}>1234</Text>
            <RiFileCopyLine color={colors.darkerGray} cursor='pointer' />
          </div>
        </div>

      </div>
    </Modal >
  )
}