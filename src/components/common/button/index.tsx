import React, { CSSProperties, useMemo } from 'react';
import { colors } from 'styles/colors';

type Props = {
  children: string,
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontColor?: string;
}

export const Button = ({
  children,
  color = colors.darkBlue,
  width = '85px',
  height = '35px',
  fontSize = '1rem',
  fontColor = colors.white,
}: Props) => {
  const styles = useMemo((): CSSProperties => {
    return {
      width,
      height,
      color: fontColor,
      backgroundColor: color,
      border: 'none',
      borderRadius: '3px',
      fontSize,
      cursor: 'pointer',
    }
  }, [color, fontColor, fontSize, height, width]);

  return (
    <button
      style={styles}>
      {children}
    </button>
  )
}