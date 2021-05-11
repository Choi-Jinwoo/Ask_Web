import { CSSProperties, useCallback, useMemo } from 'react';
import { colors } from 'styles/colors';
import { composeSize } from 'utils/ui';

type ColorType = 'light' | 'dark';
type SizeType = 'big' | 'regular' | 'small';
type WeightType = 'bold' | 'bolder' | 'normal' | 'lighter';
type CursorType = 'none' | 'pointer';

type Props = {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: ColorType | string;
  size?: SizeType | string;
  weight?: WeightType;
  cursor?: CursorType;
  onClick?: Function;
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
  cursor = 'none',
  onClick,
  children
}: Props) => {
  const styles = useMemo((): CSSProperties => {
    return {
      fontSize: getSize(size),
      color: getColor(color),
      fontWeight: weight,
      cursor,
    }
  }, [color, cursor, size, weight]);

  const handleOnClick = useCallback(() => {
    if (onClick !== undefined) {
      onClick();
    }
  }, [onClick]);

  return (
    <Tag
      onClick={handleOnClick}
      className={className}
      style={styles}>{children}</Tag>
  )
}