import { KeyboardEvent, useCallback } from 'react';
import { Modal } from 'components/common/modal';
import { Text } from 'components/common/text';

import './index.scss';
import { Button } from 'components/common/button';

type Props = {
  adminCode: string;
  onAdminCodeChange: (e: any) => void;
  isOpen: boolean;
  handleClose: () => void;
  handleJoin: () => void;
  handleClickCreateLecture: () => void;
}

export const JoinLecturerModal = ({
  adminCode,
  onAdminCodeChange,
  isOpen,
  handleClose,
  handleJoin,
  handleClickCreateLecture,
}: Props) => {
  const onJoinClick = useCallback((e) => {
    handleJoin();
  }, [handleJoin])

  const handleKeyPressed = useCallback((e: KeyboardEvent) => {
    console.log(e.key);

    if (e.key === 'Enter') {
      handleJoin();
    }
  }, [handleJoin])

  return (
    <Modal
      title='강사 페이지 접속'
      isOpen={isOpen}
      close={handleClose}
      maxWidth='400px'
      width='90%'
      height='260px'
    >
      <div className='joinLecturerModal'>
        <Text>강사 코드</Text>
        <Text size='small'>강의 생성 시 발급된 코드를 입력해주세요</Text>
        <input
          value={adminCode}
          onChange={onAdminCodeChange}
          className='joinLecturerModal-code'
          type='password'
          onKeyPress={handleKeyPressed}
        />

        <Text
          size='small'
          cursor='pointer'
          onClick={handleClickCreateLecture}
        >새로운 강의만들기</Text>

        <div className='joinLecturerModal-buttonWrapper'>
          <Button
            onClick={onJoinClick}
          >접속</Button>
        </div>
      </div>
    </Modal >
  )
}