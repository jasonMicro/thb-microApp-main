import PageView from '@/layouts/PageView';

const form_router = [
  {
    path: 'form',
    name: '表单页',
    meta: {
      icon: 'form',
      page: {
        cacheAble: false
      }
    },
    component: PageView,
    children: [
      {
        path: 'basic',
        name: '基础表单',
        component: () => import('@/pages/form/basic')
      },
      {
        path: 'step',
        name: '分步表单',
        component: () => import('@/pages/form/step')
      },
      {
        path: 'advance',
        name: '高级表单',
        component: () => import('@/pages/form/advance')
      }
    ]
  }
];

export default form_router;
