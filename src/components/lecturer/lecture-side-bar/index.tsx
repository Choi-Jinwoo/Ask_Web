import { useState } from 'react';
import { LectureSideBarItem } from './lecture-side-bar-item';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import './index.scss';

const SIDEBAR_APPEAR_AWAIT_MS = 2000;

type Props = {
  handleCloseLecture: () => void;
}

export const LectureSideBar = ({
  handleCloseLecture
}: Props) => {
  const [isShow, setShow] = useState<boolean>(false);

  setTimeout(() => {
    setShow(true);
  }, SIDEBAR_APPEAR_AWAIT_MS)

  return (
    <aside className='lectureSideBar' style={{
      left: isShow ? '0' : '-300px',
    }} >
      <div className='lectureSideBar-content'>
        <LectureSideBarItem onClick={handleCloseLecture} name='강의 종료' icon={AiOutlineCloseCircle} />
      </div>
    </aside>
  )
}