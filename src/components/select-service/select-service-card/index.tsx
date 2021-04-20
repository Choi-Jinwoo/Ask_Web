import React, { MouseEventHandler } from 'react';
import { Text } from 'components/common/text';

import './index.scss';
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
        <div className='selectServiceCard-textWrapper'>
          <Text
            className='selectServiceCard-title'
            size='big'>{title}</Text>
          <Text
            className='selectServiceCard-subTitle'
          >{subTitle}</Text>
        </div>
        <img src={image} alt="" />
      </div>
    </div>
  )
}