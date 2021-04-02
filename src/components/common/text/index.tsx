import React from 'react';
import { CSSProperties, useMemo } from 'react';
import { colors } from 'styles/color';
import { composeSize } from 'utils/ui';

type ColorType = 'light' | 'dark';
type SizeType = 'big' | 'regular' | 'small';
type WeightType = 'bold' | 'bolder' | 'normal' | 'lighter'

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: ColorType | string;
  size?: SizeType | string;
  weight?: WeightType;
  children: string;
}

const getColor = (colorType: ColorType | string): string => {
  switch (colorType) {
    case 'light':
      return colors.white;

    case 'dark':
      return colors.darkBlue;

    default:
      return colorType;
  }
}

const getSize = (sizeType: SizeType | string): string => {
  switch (sizeType) {
    case 'big':
      return composeSize(1.5, 'rem');

    case 'regular':
      return composeSize(1, 'rem');

    case 'small':
      return composeSize(0.75, 'rem');

    default:
      return sizeType;
  }
}

export const Text = ({
  tag: Tag = 'span',
  className,
  size = 'regular',
  color = 'dark',
  weight = 'normal',
  children
}: Props) => {
  const styles = useMemo((): CSSProperties => {
    return {
      fontSize: getSize(size),
      color: getColor(color),
      fontWeight: weight,
    }
  }, [color, size, weight]);

  return (
    <Tag className={className} style={styles}>{children}</Tag>
  )
}