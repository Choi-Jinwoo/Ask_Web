import React from 'react';
import { Home } from 'components/home';
import { PageTemplate } from 'components/common/page-template';
import { JoinLecturerModal } from 'components/lecturer/join-lecturer-modal';

export const HomePage = () => {
  return (
    <PageTemplate>
      <JoinLecturerModal />
      <Home />
    </PageTemplate >
  )
}
