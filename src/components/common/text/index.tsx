import React from 'react';
import { CSSProperties, useMemo } from 'react';
import { colors } from 'styles/color';
import { composeSize } from 'utils/ui';

import './index.scss';

type ColorType = 'light' | 'dark';
type SizeType = 'big' | 'regular' | 'small';

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: ColorType;
  size?: SizeType;
  children: string;
}

const getColor = (colorType: ColorType): string => {
  switch (colorType) {
    case 'light':
      return colors.white;

    case 'dark':
      return colors.darkBlue;

    // no default
  }
}

const getSize = (sizeType: SizeType): string => {
  switch (sizeType) {
    case 'big':
      return composeSize(1.5, 'rem');

    case 'regular':
      return composeSize(1, 'rem');

    case 'small':
      return composeSize(0.75, 'rem');

    // no default
  }
}

export const Text = ({
  tag: Tag = 'span',
  className,
  size = 'regular',
  color = 'dark',
  children
}: Props) => {
  const styles = useMemo((): CSSProperties => {
    return {
      fontSize: getSize(size),
      color: getColor(color),
    }
  }, [color, size]);

  return (
    <Tag className={className} style={styles}>{children}</Tag>
  )
}