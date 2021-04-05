import React from 'react';
import { PageTemplate } from 'components/common/page-template';
import { SelectServiceContainer } from 'containers/select-service.container';

export const HomePage = () => {
  return (
    <PageTemplate>
      <SelectServiceContainer />
    </PageTemplate >
  )
}
