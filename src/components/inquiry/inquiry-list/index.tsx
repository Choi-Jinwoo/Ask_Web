import './index.scss';

type Props = {
  inquiryItems: JSX.Element[],
}

export const InquiryList = ({
  inquiryItems,
}: Props) => {

  return (
    <div className='inquiryList'>
      {inquiryItems}
    </div>
  )

}
