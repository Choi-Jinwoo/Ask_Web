import { Text } from 'components/common/text';
import { AccessLevels } from 'enum/user.enum';
import { useCallback, useMemo } from 'react';
import { colors } from 'styles/colors';
import { IInquiry } from 'types/inquiry.interface';
import { IUser } from 'types/user.interface';
import { formatDate } from 'utils/date/date.util';

import BasicProfile from 'assets/basic_profile.png';

import './index.scss';

type Props = {
  inquiry: IInquiry,
}

interface IUserProfile {
  name: string;
  detail: string;
  profileImage: string;
}

const userToProfile = (user: IUser | null): IUserProfile => {
  if (user !== null) {
    const { name, profileImage, accessLevel, grade, room, number } = user;
    switch (accessLevel) {
      case AccessLevels.TEACHER:
        return {
          name,
          detail: '선생님',
          profileImage: profileImage ?? BasicProfile,
        };

      case AccessLevels.STUDENT:
        return {
          name,
          detail: `${grade}학년 ${room}반 ${number}번`,
          profileImage: profileImage ?? BasicProfile,
        }
    }
  }

  return {
    name: '익명',
    detail: '-',
    profileImage: BasicProfile,
  }
}

export const InquiryItem = ({
  inquiry
}: Props) => {
  const { content, user, createdAt } = inquiry;

  const userProfile = useMemo(() => {
    return userToProfile(user);
  }, [user])

  const formattedDate = useMemo(() => {
    return formatDate(createdAt);
  }, [createdAt]);

  const { name, detail, profileImage } = userProfile;

  const onImageLoadError = useCallback((e) => {
    e.target.src = BasicProfile;
  }, []);

  return (
    <div className='inquiryItem'>
      <div className='inquiryItem-profileImageWrapper'>
        <img
          className='inquiryItem-profileImage'
          src={profileImage} alt={BasicProfile} onError={onImageLoadError} />
      </div>

      <div className='inquiryItem-content'>
        <div className='inquiryItem-content-profile'>
          <Text weight='bold' size='1.25rem'>{name}</Text>
          <Text
            className='inquiryItem-content-profile-classroom'
          >{detail}</Text>
        </div>

        <div className='inquiryItem-content-inquiry'>
          {content}
        </div>

        <div className='inquiryItem-content-time'>
          <Text
            size='small'
            color={colors.darkerGray}
          >{formattedDate}</Text>
        </div>
      </div>
    </div>
  )
}