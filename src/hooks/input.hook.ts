import { useState } from 'react'

export const useInputText = () => {
  const [text, setText] = useState<string>('');

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