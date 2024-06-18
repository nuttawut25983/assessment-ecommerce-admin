import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { getCookie } from 'cookies-next';

interface AxiosRequestConfigCustom extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const Http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    // Authorization: token ? `Bearer ${token}` : '',
  },
});

Http.interceptors.request.use(
  (config: AxiosRequestConfigCustom) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

Http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // console.log(error);
    // if (error != null && error.response.status === 401) {
    //   // authService.clearLoginState();
    //   return false;
    // }
    // throw error.response?.data;
    return Promise.reject(error);
  },
);

export default Http;
