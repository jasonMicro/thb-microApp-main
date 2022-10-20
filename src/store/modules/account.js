import { login } from '@/services/account';
import { message } from 'ant-design-vue';
import { setAuthorization } from '@/utils/request';
const account = {
  namespaced: true,
  state: {
    isLogin: {},
    user: undefined,
    permissions: null,
    roles: null,
    routesConfig: null
  },
  getters: {
    user: (state) => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY);
          state.user = JSON.parse(user);
        } catch (e) {
          console.error(e);
        }
      }
      return state.user;
    },
    permissions: (state) => {
      if (!state.permissions) {
        try {
          const permissions = localStorage.getItem(
            process.env.VUE_APP_PERMISSIONS_KEY
          );
          state.permissions = JSON.parse(permissions);
          state.permissions = state.permissions ? state.permissions : [];
        } catch (e) {
          console.error(e.message);
        }
      }
      return state.permissions;
    },
    roles: (state) => {
      if (!state.roles) {
        try {
          const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY);
          state.roles = JSON.parse(roles);
          state.roles = state.roles ? state.roles : [];
        } catch (e) {
          console.error(e.message);
        }
      }
      return state.roles;
    },
    routesConfig: (state) => {
      if (!state.routesConfig) {
        try {
          const routesConfig = localStorage.getItem(
            process.env.VUE_APP_ROUTES_KEY
          );
          state.routesConfig = JSON.parse(routesConfig);
          state.routesConfig = state.routesConfig ? state.routesConfig : [];
        } catch (e) {
          console.error(e.message);
        }
      }
      return state.routesConfig;
    }
  },
  mutations: {
    SET_TOKEN: (state, { type, data }) => {
      if (type) {
        state.isLogin = {
          state: 1,
          data: data
        };
        localStorage.setItem('admin.user', JSON.stringify(data));
        localStorage.setItem('tenantcode', data.tenantCode);
        localStorage.setItem('token', data.token);
        setAuthorization({
          token: data.token,
          expireAt: data.expire
        });
      } else {
        state.isLogin.state = Math.random();
      }
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user));
    },
    setPermissions(state, permissions) {
      state.permissions = permissions;
      localStorage.setItem(
        process.env.VUE_APP_PERMISSIONS_KEY,
        JSON.stringify(permissions)
      );
    },
    setRoles(state, roles) {
      state.roles = roles;
      localStorage.setItem(
        process.env.VUE_APP_ROLES_KEY,
        JSON.stringify(roles)
      );
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig;
      localStorage.setItem(
        process.env.VUE_APP_ROUTES_KEY,
        JSON.stringify(routesConfig)
      );
    }
  },
  actions: {
    login: async ({ commit }, params, config) => {
      const _this = this;
      const { data } = await login(params);
      if (data?.code === 200) {
        commit('SET_TOKEN', { type: true, data: data.data });
      } else {
        commit('SET_TOKEN', { type: false });
        message.error(data?.msg || '登录失败！');
      }
    }
  }
};
export default account;
