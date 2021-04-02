import React from 'react';
import { Header } from './header';

type Props = {
  children: React.ReactNode;
}

export const PageTemplate = ({
  children,
}: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
