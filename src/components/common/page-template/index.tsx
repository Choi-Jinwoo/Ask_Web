import React from 'react';
import { Header } from './header';

import './index.scss';

type Props = {
  children: React.ReactNode;
}

export const PageTemplate = ({
  children,
}: Props) => {
  return (
    <div className='pageTemplate'>
      <Header />
      <div className='pageTemplate-children'>
        {children}
      </div>
    </div>
  )
}
