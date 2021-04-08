import { RouteConfig } from '../types'

const route: RouteConfig = {
  path: '/export-declaration',
  component: 'router/View',
  redirect: '/export-declaration/materials',
  title: '出口报关',
  icon: 'export',
  routes: [
    {
      path: '/export-declaration/materials',
      component: 'router/View',
      title: '航材接货',
      authorities: ['add', 'edit'],
      routes: [
        {
          exact: true,
          path: '/export-declaration/materials',
          component: 'views/export-declaration/materials/list',
          title: '航材接货',
          breadcrumb: false,
          hidden: true,
        },
        {
          path: '/export-declaration/materials/add',
          component: 'views/export-declaration/materials/detail',
          title: '整合申报',
          hidden: true,
          authorities: ['upload'],
        },
        {
          path: '/export-declaration/materials/edit/:id',
          component: '',
          title: '编辑',
          hidden: true,
        },
      ],
    },
    {
      path: '/export-declaration/entry',
      component: 'router/View',
      title: '报关单录入',
      routes: [
        {
          path: '/export-declaration/entry',
          component: '',
          title: '报关单录入',
          breadcrumb: false,
          hidden: true,
        },
        {
          path: '/export-declaration/entry/add',
          component: '',
          title: '录入',
          hidden: true,
        },
        {
          path: '/export-declaration/entry/integrate/:id',
          component: '',
          title: '整合申报',
          hidden: true,
        },
        {
          path: '/export-declaration/entry/edit/:id',
          component: '',
          title: '编辑',
          hidden: true,
        },
        {
          path: '/export-declaration/entry/detail/:id',
          component: '',
          title: '详情',
          hidden: true,
        },
      ],
    },
  ],
}

export default route
