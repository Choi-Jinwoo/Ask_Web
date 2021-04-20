import { LoginModal } from 'components/auth/login-modal'
import { useCallback, useState } from 'react'

export const SendInquiryContainer = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(true);

  const handleCloseLoginModal = useCallback(() => {
    setLoginModalOpen(false);
  }, [])

  return (
    <div>
      <LoginModal
        isOpen={isLoginModalOpen}
        handleClose={handleCloseLoginModal}
      />
    </div>
  )
}