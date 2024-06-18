import Http from '@/api/Http';
import { deleteCookie, setCookie } from 'cookies-next';

const PATH = '/authenticate';

const authService = {
  login: async (data: any) => {
    try {
      const url = `${PATH}/login/admin`;
      const res = await Http.post(url, data);
      if (res.data) {
        setCookie('access_token', res.data.access_token);
        return res;
      }
    } catch (err) {
      return err;
    }
  },
  logout: async () => {
    try {
      deleteCookie('access_token');
    } catch (err) {
      return err;
    }
  },
};

export default authService;
