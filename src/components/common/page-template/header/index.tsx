import { Text } from 'components/common/text';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useStores } from 'stores/use-stores';

import './index.scss';

export const Header = observer(() => {
  const { inquiryStore } = useStores();

  const title = useMemo(() => {
    const lecture = inquiryStore.lecture;

    if (lecture === null) {
      return ''
    }

    return lecture.title;
  }, [inquiryStore.lecture]);

  return (
    <header className='header'>
      <div className='header-serviceIntro'>
        <Text
          size='big'
          weight='bold'
          className='header-serviceIntro-title'>ASK</Text>

        <Text
          size='small'
          className='header-serviceIntro-subTitle'>실시간 질문 서비스</Text>
      </div>

      <Text
        size='big'
        weight='bold'
        className='header-title'>{title}</Text>
    </header >
  )
});