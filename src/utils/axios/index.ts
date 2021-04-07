import axios from 'axios';
import { BASE_ENDPOINT } from 'config/endpoint';

export const baseAxios = axios.create({
  baseURL: BASE_ENDPOINT,
})
