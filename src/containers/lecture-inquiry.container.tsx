import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { adminCodeStorage } from 'storage/admin-code.storage';
import { useStores } from 'stores/use-stores';

export const LectureInquiryContainer = observer(() => {
  const { inquiryStore } = useStores();
  const history = useHistory();

  useEffect(() => {
    const adminCode = adminCodeStorage.get();

    if (adminCode === null) {
      alert('다시 로그인해주세요');
      history.push('/');
      return;
    }

    inquiryStore.fetch(adminCode);
  }, [history, inquiryStore])

  console.log(inquiryStore.inquiries);

  return (
    <div>
    </div>
  );
});