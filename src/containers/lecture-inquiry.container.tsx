import { InquiryItem } from 'components/inquiry/inquiry-item';
import { MessageList } from 'components/inquiry/message-list';
import { MessageItem } from 'components/inquiry/message-item';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { InquirySocketSingleton } from 'socket/inquiry.socket';
import { inquiryEmitter } from 'socket/inquiry/inquiry.emitter';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useStores } from 'stores/use-stores';
import { IInquiry } from 'types/inquiry.interface';
import { PinnedInquiryModal } from 'components/inquiry/pinned-inquiry-modal';
import { lectureStorage } from 'storage/lecture.storage';
import { LectureSideBar } from 'components/lecturer/lecture-side-bar';
import { lectureStore } from 'stores/lecture.store';
import { JoinCodeModal } from 'components/lecturer/join-code-modal';

export const LectureInquiryContainer = observer(() => {
  const refs = useRef<HTMLDivElement>(null);

  const { inquiryStore } = useStores();
  const history = useHistory();

  const [pinnedInquiry, setPinnedInquiry] = useState<IInquiry | null>(null);
  const [isJoinCodeModalOpen, setJoinCodeModalOpen] = useState<boolean>(false);

  const handleCloseJoinCodeModal = useCallback(() => {
    setJoinCodeModalOpen(false);
  }, [])

  const joinCode: string = useMemo(() => {
    if (inquiryStore.lecture === null) {
      return '현재 번호를 확인할 수 없습니다';
    }

    return inquiryStore.lecture.joinCode;
  }, [inquiryStore.lecture]);

  const handleOpenJoinCodeModal = useCallback(() => {
    setJoinCodeModalOpen(true);
  }, [])

  const handleExtractAdminCode = useCallback((): string => {
    const adminCode = adminCodeStorage.get();
    if (adminCodeStorage === null) {
      alert('다시 로그인 해주세요');
      history.push('/');
    }

    return adminCode as string;
  }, [history]);

  const handlePinInquiry = useCallback((inquiry: IInquiry) => {
    setPinnedInquiry(inquiry);
  }, []);

  const handleUnpinInquiry = useCallback(() => {
    setPinnedInquiry(null);
  }, [])

  const shouldScrollToBottom = useCallback((): boolean => {
    if (refs.current === null) return false;

    return refs.current.clientHeight + refs.current.scrollTop >= refs.current.scrollHeight;
  }, [refs]);

  const handleScrollToBottom = useCallback(() => {
    if (refs.current === null) return;
    refs.current!.scrollTo({
      top: refs.current!.scrollHeight
    })
  }, [])

  const handleReceiveInquiry = useCallback((data) => {
    const { inquiry } = data.data;

    const shouldScroll = shouldScrollToBottom();
    inquiryStore.addInquiry(inquiry)

    if (shouldScroll) {
      handleScrollToBottom();
    }
  }, [handleScrollToBottom, inquiryStore, shouldScrollToBottom])

  const handleFetchInquiries = useCallback((): Promise<void> => {
    return inquiryStore.fetch(handleExtractAdminCode());
  }, [handleExtractAdminCode, inquiryStore]);

  const handleCloseLecture = useCallback(async () => {
    if (inquiryStore.lecture === null) {
      return;
    }

    try {
      await lectureStore.close(inquiryStore.lecture);
      adminCodeStorage.remove();
      history.push('/');
    } catch (err) {
      alert('강의종료 중 오류가 발생했습니다');
    }
  }, [history, inquiryStore.lecture])

  const inquiryItems = inquiryStore.inquiries.map((inquiry, index) => {
    return (
      <MessageItem key={index}>
        <InquiryItem inquiry={inquiry} handlePinInquiry={handlePinInquiry} />
      </MessageItem>
    )
  });

  // 데이터 Fetch
  useEffect(() => {
    handleFetchInquiries()
      .then(() => {
        handleScrollToBottom();
      })
  }, [handleFetchInquiries, handleScrollToBottom])

  // 소켓 이벤트 Emit & 이벤트 리스너 등록
  useEffect(() => {
    InquirySocketSingleton.instance.onReceiveInquiry = handleReceiveInquiry;
    inquiryEmitter.joinLecturer(handleExtractAdminCode());
  }, [handleExtractAdminCode, handleReceiveInquiry]);

  // 스크롤 이벤트 지정
  useEffect(() => {
    let isLoading = false;
    refs.current!.addEventListener('scroll', () => {
      const scrollTop = refs.current!.scrollTop;
      const height = refs.current!.scrollHeight;

      if (scrollTop <= 0) {
        if (!isLoading) {
          isLoading = true;

          setTimeout(() => {
            handleFetchInquiries()
              .then(() => {
                if (inquiryStore.shouldMoveScroll) {
                  refs.current!.scrollTo({
                    top: refs.current!.scrollHeight - height,
                  });
                }
                isLoading = false;
              });
          }, 500)
        }
      }
    })
  }, [handleFetchInquiries, inquiryStore.shouldMoveScroll])

  useEffect(() => {
    if (!adminCodeStorage.hasItem()) {
      alert('다시 로그인 해주세요');
      history.push('/');
    } else if (lectureStorage.hasItem()) {
      inquiryStore.lecture = lectureStorage.get();
    }
  }, [history, inquiryStore])

  return (
    <>
      <JoinCodeModal isOpen={isJoinCodeModalOpen} handleClose={handleCloseJoinCodeModal} joinCode={joinCode} />
      <LectureSideBar handleCloseLecture={handleCloseLecture} handleShowJoinCode={handleOpenJoinCodeModal} />
      <PinnedInquiryModal inquiry={pinnedInquiry} handleUnPinInquiry={handleUnpinInquiry} />
      < MessageList messageItems={inquiryItems} refs={refs} />
    </>
  );
});