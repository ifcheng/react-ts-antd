import { RouteConfig } from '../types'

const route: RouteConfig = {
  path: '/export-declaration',
  component: '@/layout',
  redirect: '/export-declaration/materials',
  title: '出口报关',
  icon: 'export',
  routes: [
    {
      path: 'materials',
      component: '@/router/View',
      title: '航材接货',
      routes: [
        {
          path: '',
          component: '',
          title: '航材接货',
          breadcrumb: false,
          hidden: true,
        },
        {
          path: 'add',
          component: '',
          title: '整合申报',
          hidden: true,
        },
        {
          path: 'edit/:id',
          component: '',
          title: '编辑',
          hidden: true,
        },
      ],
    },
    {
      path: 'entry',
      component: '@/router/View',
      title: '报关单录入',
      routes: [
        {
          path: '',
          component: '',
          title: '报关单录入',
          breadcrumb: false,
          hidden: true,
        },
        {
          path: 'add',
          component: '',
          title: '录入',
          hidden: true,
        },
        {
          path: 'integrate/:id',
          component: '',
          title: '整合申报',
          hidden: true,
        },
        {
          path: 'edit/:id',
          component: '',
          title: '编辑',
          hidden: true,
        },
        {
          path: 'detail/:id',
          component: '',
          title: '详情',
          hidden: true,
        },
      ],
    },
  ],
}

export default route
