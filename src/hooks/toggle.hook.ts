import { useState } from 'react'

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = () => {
    setState((pre) => !pre);
  }

  return [state, toggle];
}