import { Modal } from 'components/common/modal';
import { Text } from 'components/common/text';

import './index.scss';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  joinCode: string;
}

export const JoinCodeModal = ({
  isOpen,
  handleClose,
  joinCode,
}: Props) => {
  return (
    <Modal
      title='접속 코드'
      isOpen={isOpen}
      close={handleClose}
      maxWidth='400px'
      width='90%'
      height='200px'
    >
      <div className='joinCodeModal'>
        <Text size='big' weight='bold'>{joinCode}</Text>
      </div>
    </Modal >
  )
}