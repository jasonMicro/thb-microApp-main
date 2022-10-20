import {
  limitOne,
  updatePassword,
  updateAccount
} from '@/services/personal/personalCenter';

/**
 *
 *
 * */
const personalCenter = {
  namespaced: true,
  state: {
    userInfo: {}
  },
  getters: {},
  mutations: {
    SET_USER_INFO: (state, data) => {
      state.userInfo = data;
    }
  },
  actions: {
    getUserInfo: async ({ commit }, params) => {
      const {
        data: { data }
      } = await limitOne(params);
      commit('SET_USER_INFO', data);
      return data;
    },
    updatePassword: async ({ commit }, params) => {
      const { data } = await updatePassword(params);
      return data;
    },
    updateAccount: async ({ commit }, params) => {
      const { data } = await updateAccount(params);
      return data;
    }
  }
};
export default personalCenter;
