import dtil from 'dtil';

const MILLISECONDS_OF_SECOND = 1000;
const MILLISECONDS_OF_MINUTE = MILLISECONDS_OF_SECOND * 60;
const MILLISECONDS_OF_HOUR = MILLISECONDS_OF_MINUTE * 60;
const MILLISECONDS_OF_DAY = MILLISECONDS_OF_HOUR * 24;
const MILLISECONDS_OF_WEEK = MILLISECONDS_OF_DAY * 7;

export const formatDate = (createAt: string): string => {
  const today = new Date();
  const createdAtDt = dtil(createAt);
  if (createdAtDt.isSameDate(today)) {
    return `오늘 ${createdAtDt.format('HH:mm')}`;
  }

  return createdAtDt.format('yyyy-MM-dd HH:mm');
}

export const convertRelativeTime = (createdAt: string): string => {
  const now = Date.now();
  const createdAtTime = new Date(createdAt).getTime();

  const diffNowAndCreatedAt = now - createdAtTime;

  if (diffNowAndCreatedAt / MILLISECONDS_OF_WEEK > 1) {
    return `${Math.ceil(diffNowAndCreatedAt / MILLISECONDS_OF_WEEK)}주 전`;
  }
  if (diffNowAndCreatedAt / MILLISECONDS_OF_DAY > 1) {
    return `${Math.ceil(diffNowAndCreatedAt / MILLISECONDS_OF_DAY)}일 전`;
  }
  if (diffNowAndCreatedAt / MILLISECONDS_OF_HOUR > 1) {
    return `${Math.ceil(diffNowAndCreatedAt / MILLISECONDS_OF_HOUR)}시간 전`;
  }
  if (diffNowAndCreatedAt / MILLISECONDS_OF_MINUTE > 1) {
    return `${Math.ceil(diffNowAndCreatedAt / MILLISECONDS_OF_MINUTE)}분 전`;
  }
  if (diffNowAndCreatedAt / MILLISECONDS_OF_SECOND > 1) {
    return `${Math.ceil(diffNowAndCreatedAt / MILLISECONDS_OF_SECOND)}초 전`;
  }

  return '방금 전'
}