import { useState } from 'react'

export const useInputText = (initialValue: string): [string, (e: any) => void, () => void] => {
  const [text, setText] = useState<string>(initialValue);

  const onChange = (e: any) => {
    setText(e.target.value);
  }

  const clear = () => {
    setText('');
  }

  const hooksReturnArray: [string, (e: any) => void, () => void] = [
    text, onChange, clear
  ]

  return hooksReturnArray;
}