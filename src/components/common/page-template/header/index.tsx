import React from 'react';
import { Text } from 'components/common/text';

import './index.scss';

export const Header = () => {
  return (
    <header className='header'>
      <Text
        size='big'
        className='header-title'>ASK</Text>

      <Text
        size='small'
        className='header-subTitle'>실시간 질문 서비스</Text>
    </header>
  )
}