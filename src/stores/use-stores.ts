import { inquiryStore } from './inquiry.store';
import { authStore } from './auth.store';

export const useStores = () => {
  return {
    inquiryStore,
    authStore,
  }
}