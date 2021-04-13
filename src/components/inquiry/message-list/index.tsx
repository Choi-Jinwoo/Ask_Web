import './index.scss';

type Props = {
  messageItems: JSX.Element[],
  refs: React.Ref<HTMLDivElement>
}

export const MessageList = ({
  messageItems,
  refs,
}: Props) => {

  return (
    <div className='messageList' ref={refs}>
      {messageItems}
    </div>
  )

}
