import axios from 'axios';
import { logOut as requestLogout } from '@infosight/shell-api/lib/UserProfile';

const axiosInstance = axios.create();

const errorInterceptor = error => {
  const { response } = error;
  if (response && response.status === 401) {
    requestLogout();
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(response => response, errorInterceptor);

export default axiosInstance;
