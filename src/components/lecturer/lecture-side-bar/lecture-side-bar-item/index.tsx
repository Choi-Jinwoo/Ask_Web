import { IconType } from 'react-icons/lib'

import './index.scss';

type Props = {
  icon: IconType;
  name: string;
  onClick: (e: any) => void
}

export const LectureSideBarItem = ({
  icon,
  name,
  onClick,
}: Props) => {

  return (
    <div className='lectureSideBarItem' onClick={onClick}>
      <span className='lectureSideBarItem-icon'>{icon({})}</span>
      {name}
    </div>
  );
}