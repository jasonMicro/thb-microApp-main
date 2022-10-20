import Request from '@/services/request';

const hp = new Request('/api/ucenter/');

const api = {
  limitOne: 'account/get',
  updatePassword: 'account/updatePassword',
  updateAccount: 'account/updateAccount'
};

/**
 * 通过id获取账号信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const limitOne = async (param) => {
  return hp.get(api.limitOne + '/' + param);
};

/**
 * 修改密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export const updatePassword = async (param) => {
  return hp.put(api.updatePassword, param);
};

/**
 * 修改个人信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export const updateAccount = async (params) => {
  return hp.put(api.updateAccount, params);
};

export default {
  limitOne,
  updatePassword,
  updateAccount
};
