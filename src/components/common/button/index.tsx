import React, { CSSProperties, useMemo } from 'react';
import { MouseEventHandler } from 'react';
import { colors } from 'styles/colors';

type Props = {
  children: string,
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontColor?: string;
  onClick?: MouseEventHandler;
}

export const Button = ({
  children,
  color = colors.darkBlue,
  width = '80px',
  height = '30px',
  fontSize = '0.85rem',
  fontColor = colors.white,
  onClick,
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
      outline: 'none',
    }
  }, [color, fontColor, fontSize, height, width]);

  return (
    <button
      onClick={onClick}
      style={styles}>
      {children}
    </button>
  )
}