import React, { useCallback } from 'react';
import { Text } from 'components/common/text';

import './index.scss';
import { useHistory } from 'react-router';

type Props = {
  title: string;
  subTitle: string;
  image: string;
  targetPath: string;
}

export const SelectServiceCard = ({
  title,
  subTitle,
  image,
  targetPath,
}: Props) => {

  const history = useHistory();

  const movePage = useCallback(() => {
    history.push(targetPath);
  }, [history, targetPath]);

  return (
    <div
      className='selectServiceCard'
      onClick={movePage} >
      <div className='selectServiceCard-contentWrapper'>
        <Text
          className='selectServiceCard-title'
          size='big'>{title}</Text>
        <Text
          className='selectServiceCard-subTitle'
        >{subTitle}</Text>
        <img src={image} alt="" />
      </div>
    </div>
  )
}