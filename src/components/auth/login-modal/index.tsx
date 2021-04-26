import { Modal } from 'components/common/modal'
import { Text } from 'components/common/text';
import { Button } from 'components/common/button';

import './index.scss';
import { useInputText } from 'hooks/input.hook';
import { useCallback } from 'react';
import { useStores } from 'stores/use-stores';
import { tokenStorage } from 'storage/token.storage';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginModal = ({
  isOpen,
  handleClose,
}: Props) => {
  const [id, onIdChange, clearId] = useInputText();
  const [pw, onPwChange, clearPw] = useInputText();

  const { authStore } = useStores();

  const handleLogin = useCallback(() => {
    authStore.login(id, pw)
      .then((token) => {
        tokenStorage.set(token);
        alert('로그인 성공');
        handleClose();
      })
      .catch(() => {
        alert('아이디, 비밀번호를 확인해주세요');
      })
      .finally(() => {
        clearId();
        clearPw();
      })
  }, [authStore, clearId, clearPw, handleClose, id, pw])

  return (
    <Modal
      title='도담도담 로그인'
      isOpen={isOpen}
      close={handleClose}
      maxWidth='400px'
      width='90%'
      height='320px'
    >
      <div className='loginModal'>
        <Text size='small' >도담도담 아이디, 비밀번호를 사용하여 로그인 해보세요</Text>
        <div className='loginModal-inputWrapper'>
          <Text weight='bold' size='small'>아이디</Text>
          <input
            value={id}
            onChange={onIdChange}
            className='loginModal-id'
            placeholder='도담도담 아이디'
            type='text'
          />
        </div>

        <div className='loginModal-inputWrapper'>
          <Text weight='bold' size='small'>비밀번호</Text>
          <input
            value={pw}
            onChange={onPwChange}
            className='loginModal-pw'
            placeholder='도담도담 비밀번호'
            type='password'
          />
        </div>


        <div className='loginModal-buttonWrapper'>
          <Button
            onClick={handleLogin}
          >로그인</Button>
        </div>
      </div>
    </Modal >
  )
}