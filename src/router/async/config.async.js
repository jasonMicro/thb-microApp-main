import routerMap from './router.map';
import { parseRoutes } from '@/utils/routerUtil';

// 异步路由配置
const routesConfig = [
  'login',
  'root',
  'adminLogin',
  'admin', //adminLogin 转发 目标路由
  'transportLogin',
  {
    //由于演示这里使用子应用静态路由，如果使用动态路由需要在管理平台添加菜单即可
    path: '/chart',
    name: '子应用系统',
    component: () => import('@/pages/micro-page')
  }
  // {
  //   // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
  //   path: '/micro/*', // vue-router@4.x path的写法为：'/my-page/:page*'
  //   name: '环卫系统',
  //   component: view.tabs,
  //   children: [
  //     {
  //       path: '/micro/pc-admin/sanitation/member/position',
  //       name: '子应用',
  //       component: MicroPage
  //     }
  //   ]
  // }
];

// 更新应用到路由
const config = JSON.parse(localStorage.getItem(process.env.VUE_APP_ROUTES_KEY));
config &&
  config.forEach((item) => {
    routerMap[item.clientCode] = {
      name: item.clientName,
      component: () => import('@/layouts/BlankView')
    };
  });

const options = {
  routes: parseRoutes(routesConfig, routerMap)
};

export default options;
