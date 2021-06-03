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
import { JoinAuditorModal } from 'components/auditor/join-auditor-modal';
import { tokenStorage } from 'storage/token.storage';
import { LoginModal } from 'components/auth/login-modal';
import { useStores } from 'stores/use-stores';
import { ILecture } from 'types/lecture.interface';
import { CreateLectureModal } from 'components/lecturer/create-lecture-modal';

export const SelectServiceContainer = observer(() => {
  const { lectureStore } = useStores();

  const history = useHistory();

  const [adminCode, onAdminCodeChange, clearAdminCode] = useInputText('');
  const [joinCode, onJoinCodeChange, clearJoinCode] = useInputText('');
  const [isLoginModalOpen, setLoginModalOpen] =
    useState<boolean>(false);
  const [isJoinLecturerModalOpen, setJoinLecturerModalOpen]
    = useState<boolean>(false);
  const [isJoinAuditorModalOpen, setJoinAuditorModalOpen]
    = useState<boolean>(false);

  const handleCloseJoinAuditorModal = useCallback(() => {
    setJoinAuditorModalOpen(false);
    clearJoinCode();
  }, [clearJoinCode])

  const handleCloseJoinLecturerModal = useCallback(() => {
    setJoinLecturerModalOpen(false);
    clearAdminCode();
  }, [clearAdminCode])

  const handleCloseLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, [])

  const handleClickLecturerService = useCallback(() => {
    setJoinLecturerModalOpen(true);
  }, [])

  const handleClickAuditorService = useCallback(() => {
    if (!tokenStorage.hasItem()) {
      setLoginModalOpen(true);
    } else {
      setJoinAuditorModalOpen(true);
    }
  }, [])

  const handleSuccessLecturerJoin = useCallback((data) => {
    const { lecture } = data.data;
    lectureStorage.set(lecture);
    adminCodeStorage.set(adminCode);
    history.push('/lecture');
  }, [adminCode, history]);

  const handleLoginSuccess = useCallback(() => {
    setJoinAuditorModalOpen(true);
  }, []);

  const handleFailLecturerJoin = useCallback(() => {
    alert('관리자 번호가 옳지 않습니다');
  }, []);

  const handleJoinLecturerService = useCallback(() => {
    InquirySocketSingleton.instance.onLecturerJoin = handleSuccessLecturerJoin;
    InquirySocketSingleton.instance.onLecturerJoinError = handleFailLecturerJoin;
    inquiryStore.init();
    InquirySocketSingleton.instance.connectSocket();
    inquiryEmitter.joinLecturer(adminCode);
  }, [adminCode, handleFailLecturerJoin, handleSuccessLecturerJoin])

  const handleJoinAuditorService = useCallback(() => {
    lectureStore.join(joinCode)
      .then((lecture: ILecture) => {
        lectureStorage.set(lecture);
        InquirySocketSingleton.instance.connectSocket();
        history.push('auditor');
      })
      .catch((err: any) => {
        switch (err.response.status) {
          case 410:
          case 401:
            alert('다시 로그인해주세요')
            tokenStorage.remove();
            break;

          case 404:
            alert('접속 코드를 확인해주세요')
            break;

          default:
            alert('다시 시도해주세요');
        }
      })
  }, [history, joinCode, lectureStore])

  const handleClickCreateLecture = useCallback(() => {
    setJoinLecturerModalOpen(false);
  }, [])

  useEffect(() => {
    adminCodeStorage.remove();
    lectureStorage.remove();
    inquiryStore.lecture = null;
  }, [])

  return (
    <div>
      <CreateLectureModal
        isOpen={true}
        handleClose={() => { }}
      />
      <JoinLecturerModal
        adminCode={adminCode}
        onAdminCodeChange={onAdminCodeChange}
        handleClickCreateLecture={handleClickCreateLecture}
        handleJoin={handleJoinLecturerService}
        isOpen={isJoinLecturerModalOpen}
        handleClose={handleCloseJoinLecturerModal} />
      <JoinAuditorModal
        joinCode={joinCode}
        onJoinCodeChange={onJoinCodeChange}
        handleJoin={handleJoinAuditorService}
        isOpen={isJoinAuditorModalOpen}
        handleClose={handleCloseJoinAuditorModal} />
      <LoginModal
        handleSuccess={handleLoginSuccess}
        isOpen={isLoginModalOpen}
        handleClose={handleCloseLoginModal}
      />
      <SelectService
        handleClickAuditorService={handleClickAuditorService}
        handleClickLecturerService={handleClickLecturerService} />
    </div>
  )
});