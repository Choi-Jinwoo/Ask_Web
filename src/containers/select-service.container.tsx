import React, { useCallback, useState } from 'react';
import { SelectService } from 'components/select-service';
import { JoinLecturerModal } from 'components/lecturer/join-lecturer-modal';

export const SelectServiceContainer = () => {
  const [isJoinLecturerModalOpen, setJoinLecturerModalOpen]
    = useState<boolean>(false);

  const handleCloseJoinLecturerModal = useCallback(() => {
    setJoinLecturerModalOpen(false);
  }, [])

  const handleClickLecturerService = useCallback(() => {
    setJoinLecturerModalOpen(true);
  }, [])

  const handleConnectLecturerService = useCallback(() => {
  }, [])

  return (
    <div>
      <JoinLecturerModal
        handleConnect={handleConnectLecturerService}
        isOpen={isJoinLecturerModalOpen}
        handleClose={handleCloseJoinLecturerModal} />
      <SelectService
        handleClickLecturerService={handleClickLecturerService} />
    </div>
  )
}