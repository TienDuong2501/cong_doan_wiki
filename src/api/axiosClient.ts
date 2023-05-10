import axios, { AxiosResponse } from 'axios';
import { history } from 'utils';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    config.headers['x-access-token'] = localStorage.getItem('access_token')
    config.headers['Accept-Language'] = localStorage.getItem("i18nextLng") || 'vi-VN'
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    if (typeof error.response !== 'undefined') {
      const isLogin = error.response.config.url.includes('signin')
      if (!isLogin) {
        if (error?.response?.status === 401) {
          localStorage.clear();
          history.push('/signin')
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
