import React, { useCallback, useEffect, useState } from 'react';
import { SelectService } from 'components/select-service';
import { JoinLecturerModal } from 'components/lecturer/join-lecturer-modal';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { InquiryEvents } from 'socket/inquiry/inquiry.event';
import { ISocketResponse } from 'socket/base.response';
import { useHistory } from 'react-router';

export const SelectServiceContainer = () => {
  const history = useHistory();

  const [isJoinLecturerModalOpen, setJoinLecturerModalOpen]
    = useState<boolean>(false);

  const handleCloseJoinLecturerModal = useCallback(() => {
    setJoinLecturerModalOpen(false);
  }, [])

  const handleClickLecturerService = useCallback(() => {
    setJoinLecturerModalOpen(true);
  }, [])

  const handleJoinLecturerService = useCallback((adminCode: string) => {
    inquiryEmitter.joinLecturer(adminCode);
  }, [])

  const handleSuccessJoin = useCallback(() => {
    history.push('/lecturer');
  }, [history]);

  useEffect(() => {
    InquirySocketSingleton.instance.socket
      .on(InquiryEvents.JOIN_LECTURER_LECTURE, (data: ISocketResponse) => {
        const { status } = data;
        if (status === 200) {
          handleSuccessJoin();
        } else if (status === 404) {
          alert('관리자 번호가 옳지 않음');
        }
      });
  }, [handleSuccessJoin]);

  return (
    <div>
      <JoinLecturerModal
        handleJoin={handleJoinLecturerService}
        isOpen={isJoinLecturerModalOpen}
        handleClose={handleCloseJoinLecturerModal} />
      <SelectService
        handleClickLecturerService={handleClickLecturerService} />
    </div>
  )
}