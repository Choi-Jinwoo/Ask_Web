import React, { useCallback, useEffect, useState } from 'react';
import { SelectService } from 'components/select-service';
import { JoinLecturerModal } from 'components/lecturer/join-lecturer-modal';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { useHistory } from 'react-router';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useInputText } from 'hooks/input.hook';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { inquiryStore } from 'stores/inquiry.store';
import { lectureStorage } from 'storage/lecture.storage';
import { observer } from 'mobx-react';

export const SelectServiceContainer = observer(() => {
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

  const handleSuccessLecturerJoin = useCallback((data) => {
    const { lecture } = data.data;
    lectureStorage.set(lecture);
    adminCodeStorage.set(adminCode);
    history.push('/lecture');
  }, [adminCode, history]);

  const handleFailLecturerJoin = useCallback(() => {
    alert('관리자 번호가 옳지 않습니다');
  }, []);

  const handleJoinLecturerService = useCallback(() => {
    InquirySocketSingleton.instance.onLecturerJoin = handleSuccessLecturerJoin;
    InquirySocketSingleton.instance.onLecturerJoinError = handleFailLecturerJoin;
    inquiryEmitter.joinLecturer(adminCode);
  }, [adminCode, handleFailLecturerJoin, handleSuccessLecturerJoin])

  useEffect(() => {
    adminCodeStorage.remove();
    lectureStorage.remove();
    inquiryStore.lecture = null;
  }, [])

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
});