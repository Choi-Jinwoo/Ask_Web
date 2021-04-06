import React, { useCallback, useState } from 'react';
import { SelectService } from 'components/select-service';
import { JoinLecturerModal } from 'components/lecturer/join-lecturer-modal';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { useHistory } from 'react-router';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useInputText } from 'hooks/input.hook';
import { InquirySocketSingleton } from 'socket/inquiry.socket';

export const SelectServiceContainer = () => {
  const history = useHistory();
  const [adminCode, onAdminCodeChange, clearAdminCode] = useInputText();

  const [isJoinLecturerModalOpen, setJoinLecturerModalOpen]
    = useState<boolean>(false);

  const handleCloseJoinLecturerModal = useCallback(() => {
    setJoinLecturerModalOpen(false);
    clearAdminCode();
  }, [clearAdminCode])

  const handleClickLecturerService = useCallback(() => {
    setJoinLecturerModalOpen(true);
  }, [])

  const handleSuccessJoin = useCallback(() => {
    adminCodeStorage.set(adminCode);
    history.push('/lecturer');
  }, [adminCode, history]);

  const handleFailJoin = useCallback(() => {
    alert('관리자 번호가 옳지 않습니다');
  }, []);

  const handleJoinLecturerService = useCallback(() => {
    InquirySocketSingleton.instance.setOnLecturerJoin(handleSuccessJoin);
    InquirySocketSingleton.instance.setOnLecturerJoinError(handleFailJoin);
    inquiryEmitter.joinLecturer(adminCode);
  }, [adminCode, handleFailJoin, handleSuccessJoin])

  return (
    <div>
      <JoinLecturerModal
        adminCode={adminCode}
        onAdminCodeChange={onAdminCodeChange}
        handleJoin={handleJoinLecturerService}
        isOpen={isJoinLecturerModalOpen}
        handleClose={handleCloseJoinLecturerModal} />
      <SelectService
        handleClickLecturerService={handleClickLecturerService} />
    </div>
  )
}