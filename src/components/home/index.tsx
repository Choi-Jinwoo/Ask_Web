import React from 'react';

import { Text } from 'components/common/text';
import { SelectServiceCard } from './select-service-card';
import StudentIllustrator from 'assets/student_illustrator.svg';
import TeacherIllustrator from 'assets/teacher_illustrator.svg';

import './index.scss';

export const Home = () => {
  return (
    <div className='home'>
      <Text
        size='2.25rem'
      >사용할 서비스를 선택하세요</Text>

      <div className='home-cardWrapper'>
        <SelectServiceCard
          targetPath='auditor'
          image={StudentIllustrator}
          title='수강자 서비스'
          subTitle='강의에 대해 질문해보세요!'
        />

        <SelectServiceCard
          targetPath='lecture'
          image={TeacherIllustrator}
          title='강사 서비스'
          subTitle='수강자의 질문을 실시간으로 받아보세요!'
        />
      </div>
    </div>
  )
}