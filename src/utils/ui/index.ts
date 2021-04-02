type UnitType = 'px' | 'rem' | 'em';

export const composeSize = (size: number, unit: UnitType) => {
  return `${size}${unit}`;
}