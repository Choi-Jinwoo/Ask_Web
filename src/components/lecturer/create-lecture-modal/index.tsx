import { Modal } from 'components/common/modal';
import { Text } from 'components/common/text';
import { Button } from 'components/common/button';
// https 를 지원하지 않아 copy 기능 제한
// import { RiFileCopyLine } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import './index.scss';
import { colors } from 'styles/colors';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  onTitleChange: (e: any) => void;
  lecturer: string;
  onLecturerChange: (e: any) => void;
  joinCode: string;
  adminCode: string;
  handleClickCreateLecture: (e: any) => void;
}

export const CreateLectureModal = ({
  isOpen,
  handleClose,
  title,
  onTitleChange,
  lecturer,
  onLecturerChange,
  joinCode,
  adminCode,
  handleClickCreateLecture,
}: Props) => {
  // const handleCopyText = useCallback((text: string) => {
  //   navigator.clipboard.writeText(text);
  // }, []);

  // const handleCopyJoinCode = useCallback(() => {
  //   handleCopyText(joinCode);
  // }, [handleCopyText, joinCode]);

  // const handleCopyAdminCode = useCallback(() => {
  //   handleCopyText(adminCode);
  // }, [adminCode, handleCopyText]);

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
            <Text tag='p' size='0.75rem' color={colors.darkBlue}>참여 코드, 관리자 코드 확인 후 닫아주세요</Text>
            <Text tag='p' size='0.75rem' color={colors.darkBlue}>참여 코드와 관리자 코드는 단 한번만 제공됩니다</Text>
          </div>
        </div>

        <div className='createLectureModal-inputWrapper'>
          <Text weight='bold' size='small'>강의 제목</Text>
          <input
            value={title}
            onChange={onTitleChange}
            className='createLectureModal-title'
            placeholder='강의 제목을 입력해주세요'
            type='text'
          />
        </div>

        <div className='createLectureModal-inputWrapper'>
          <Text weight='bold' size='small'>강사명</Text>
          <input
            value={lecturer}
            onChange={onLecturerChange}
            className='createLectureModal-lecturer'
            placeholder='강사명을 입력해주세요'
            type='text'
          />
        </div>

        <div className='createLectureModal-buttonWrapper'>
          <Button
            onClick={handleClickCreateLecture}
          >생성</Button>
        </div>

        <div className='createLectureModal-resultBox'>
          <Text size='small' weight='bold'>참여 코드</Text>
          <div className='createLectureModal-codeWrapper'>
            <Text size='small' weight='bold' color={colors.darkerGray}>{joinCode}</Text>
            {/* <RiFileCopyLine color={colors.darkerGray} cursor='pointer' onClick={handleCopyJoinCode} /> */}
          </div>
        </div>
        <div className='createLectureModal-resultBox'>
          <Text size='small' weight='bold'>관리자 코드</Text>
          <div className='createLectureModal-codeWrapper'>
            <Text size='small' weight='bold' color={colors.darkerGray}>{adminCode}</Text>
            {/* <RiFileCopyLine color={colors.darkerGray} cursor='pointer' onClick={handleCopyAdminCode} /> */}
          </div>
        </div>

      </div>
    </Modal >
  )
}