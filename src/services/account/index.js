import { api } from './api';

import Request from '@/services/request';
import { removeAuthorization } from '@/utils/request';

const req = new Request('/api/auth/');
/**
 * @description 登录服务
 * @param {string} url 接口路径
 * @param {Object} params 接口参数 {
 *     account: '',
 *     password: '',
 *     grantType: 'password'
 * }
 * @param {Object} config {'Teanant-Code':''}
 * */
export const login = async (params) => {
  return req.post(
    api.login,
    { ...params, grantType: 'password' },
    { headers: { teanantCode: params.tenantCode } }
  );
};
/**
 * 用户信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const getUserInfo = async () => {
  return req.get(api.userInfo);
};
/**
 * 退出登录
 */
export const logout = () => {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
  removeAuthorization();
};
