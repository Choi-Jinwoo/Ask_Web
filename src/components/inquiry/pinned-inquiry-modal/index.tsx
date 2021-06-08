import { Modal } from 'components/common/modal'
import { Text } from 'components/common/text';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';
import { MdCenterFocusStrong } from 'react-icons/md';
import { colors } from 'styles/colors';
import { IInquiry } from 'types/inquiry.interface';

import './index.scss';

enum ModalMode {
  DARK,
  LIGHT,
}

const colorMap = {
  light: {
    iconColor: colors.darkBlue,
    fontColor: 'black',
    backgroundColor: 'white',
  },
  dark: {
    iconColor: 'white',
    fontColor: 'white',
    backgroundColor: colors.darkBlue,
  }
}

type Props = {
  inquiry: IInquiry | null;
  handleUnPinInquiry: () => void;
}

export const PinnedInquiryModal = ({
  inquiry,
  handleUnPinInquiry,
}: Props) => {
  const [fontSize, setFontSize] = useState(1);
  const [mode, setMode] = useState(ModalMode.LIGHT);

  const isOpen = inquiry !== null;

  const color = useMemo(() => {
    switch (mode) {
      case ModalMode.LIGHT:
        return colorMap.light;

      case ModalMode.DARK:
        return colorMap.dark;
    }
  }, [mode]);

  const handleSizeUp = useCallback(() => {
    setFontSize(fontSize + 0.1);

  }, [fontSize]);

  const handleSizeDown = useCallback(() => {
    setFontSize(fontSize - 0.1);
  }, [fontSize]);

  const handleInitFontSize = useCallback(() => {
    const BASE_FONT_SIZE = 2;
    const FONT_INCREASE_SIZE = 0.01;
    const FONT_INCREASE_STEP = 10;

    if (inquiry === null) {
      return;
    }

    const fontSize
      = BASE_FONT_SIZE - inquiry.content.length / FONT_INCREASE_STEP * FONT_INCREASE_SIZE;
    setFontSize(fontSize);
  }, [inquiry]);

  const handleChangeColor = useCallback(() => {
    switch (mode) {
      case ModalMode.LIGHT:
        setMode(ModalMode.DARK);
        break;

      case ModalMode.DARK:
        setMode(ModalMode.LIGHT);
        break;
    }
  }, [mode])

  useEffect(() => {
    handleInitFontSize();
    setMode(ModalMode.LIGHT);
  }, [handleInitFontSize])

  return (
    <Modal title='고정된 질문' width='50%' height='600px' isOpen={isOpen} close={handleUnPinInquiry}
      backgroundColor={color.backgroundColor}>
      <div className='pinnedInquiry'>
        <div className='pinnedInquiry-util'>
          <AiFillPlusSquare onClick={handleSizeUp} color={color.iconColor} />
          <AiFillMinusSquare onClick={handleSizeDown} color={color.iconColor} />
          <MdCenterFocusStrong onClick={handleInitFontSize} color={color.iconColor} />
          <VscColorMode onClick={handleChangeColor} color={color.iconColor} />
        </div>

        <Text
          className='pinnedInquiry-content'
          tag='div'
          weight='bold'
          size={`${fontSize}rem`}
          color={color.fontColor}
        >
          {inquiry?.content || '로딩중'}
        </Text>
      </div>
    </Modal >
  )
}