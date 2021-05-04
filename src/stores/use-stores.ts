import { inquiryStore } from './inquiry.store';
import { authStore } from './auth.store';
import { lectureStore } from './lecture.store';

export const useStores = () => {
  return {
    inquiryStore,
    authStore,
    lectureStore,
  }
}