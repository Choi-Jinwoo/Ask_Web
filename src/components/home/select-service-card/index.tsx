import React, { MouseEventHandler } from 'react';
import { Text } from 'components/common/text';

import './index.scss';
import { useHistory } from 'react-router';

type Props = {
  title: string;
  subTitle: string;
  image: string;
  onClick?: MouseEventHandler;
}

export const SelectServiceCard = ({
  title,
  subTitle,
  image,
  onClick
}: Props) => {

  return (
    <div
      className='selectServiceCard'
      onClick={onClick} >
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