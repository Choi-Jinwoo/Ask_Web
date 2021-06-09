import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_ENDPOINT,
})
