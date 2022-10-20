import Vue from 'vue';
import Router from 'vue-router';
import { formatRoutes } from '@/utils/routerUtil';

Vue.use(Router);

// 不需要登录拦截的路由配置
const loginIgnore = {
  names: ['404', '403'], //根据路由名称匹配
  /**
   * 路由过滤
   * '/admin':地址栏路由
   * '/admin/login':地址栏输入 admin 后 转发目标路由
   * */
  paths: ['/login', '/admin', '/admin/login', '/transport/login'], //根据路由fullPath匹配
  /**
   * 判断路由是否包含在该配置中
   * @param route vue-router 的 route 对象
   * @returns {boolean}
   */
  includes(route) {
    return this.names.includes(route.name) || this.paths.includes(route.path);
  }
};

// 解决首次登录报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  undefined;
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

/**
 * 初始化路由实例
 * @param isAsync 是否异步路由模式
 * @returns {VueRouter}
 */
function initRouter(isAsync) {
  const options = isAsync
    ? require('./async/config.async').default
    : require('./config').default;
  formatRoutes(options.routes);
  //设置 路由模式 history
  // options.mode = 'history';
  return new Router(options);
}

export { loginIgnore, initRouter };
