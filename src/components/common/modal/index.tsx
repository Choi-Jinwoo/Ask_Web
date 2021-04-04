import { useMemo } from 'react';
import { Text } from '../text';
import ReactModal, { Styles } from 'react-modal';
import { IoMdClose } from 'react-icons/io';

import './index.scss';
import { colors } from 'styles/colors';

type Props = {
  title: string;
  width?: string;
  height?: string;
  children: React.ReactNode;
  isOpen: boolean,
  close: () => void;
}

export const Modal = ({
  title,
  width = '600px',
  height = '400px',
  children,
  isOpen,
  close,
}: Props) => {
  const styles: Styles = useMemo(() => {
    return {
      content: {
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: `1px solid ${colors.lightGray}`,
        padding: 0,
        width,
        height,
      }
    };
  }, [height, width]);

  return (
    <ReactModal
      style={styles}
      isOpen={isOpen} >
      <div className='modal-window-title'>
        <Text
          weight='bold'>{title}</Text>
        <IoMdClose
          className='modal-window-title-closeIcon'
          onClick={close} />
      </div>
      <div className='modal-window-content'>
        {children}
      </div>
    </ReactModal >
  )
}