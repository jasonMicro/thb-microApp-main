// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
};

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  adminLogin: {
    authority: '*',
    path: '/admin',
    redirect: '/admin/login' //做转发 拼配路由在 admin :{} 如下
  },
  /**adminLogin 路由转发 目标路由*/
  admin: {
    authority: '*',
    path: '/admin/login',
    component: () => import('@/pages/login')
  },
  transportLogin: {
    authority: '*',
    path: '/transport/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  }
};
export default routerMap;
