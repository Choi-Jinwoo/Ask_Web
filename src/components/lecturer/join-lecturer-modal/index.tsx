import React from 'react';
import { Modal } from 'components/common/modal';
import { Text } from 'components/common/text';

import './index.scss';
import { Button } from 'components/common/button';

export const JoinLecturerModal = () => {
  return (
    <Modal
      title='강사 페이지 접속'
      isOpen={true}
      close={() => { }}
      width='400px'
      height='225px'
    >
      <div className='joinLecturerModal'>
        <Text>강사 코드</Text>
        <Text size='small'>강의 생성 시 발급된 코드를 입력해주세요</Text>
        <input className='joinLecturerModal-code' type='password' />

        <div className='joinLecturerModal-buttonWrapper'>
          <Button>접속</Button>
        </div>
      </div>
    </Modal >
  )
}