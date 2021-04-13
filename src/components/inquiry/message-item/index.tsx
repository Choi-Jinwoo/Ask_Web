import './index.scss';

type Props = {
  children: React.ReactNode,
}

export const MessageItem = ({
  children,
}: Props) => {
  return (
    <div className='messageItem'>
      {children}
    </div>
  )
}