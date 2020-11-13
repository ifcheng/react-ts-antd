import request from '../request'
import batchImport from '@/utils/batchImport'
import { RouteConfig } from '@/router'

const context = '/coms/admin/sys/menus'

// 查询菜单、权限列表
export function fetchMenuList(data: any) {
  return request({
    url: context + '/getMenuListByUser',
    data,
  })
}

// 查询菜单列表（不包含权限）
export function fetchMenusWithoutAuthority(data: any) {
  return request({
    url: context + '/menuTree',
    data,
  })
}

// 查询当前用户菜单树
export function fetchCurrentUserMenus(): Promise<RouteConfig[]> {
  return process.env.NODE_ENV === 'development'
    ? Promise.resolve(batchImport(require.context('@/router/routes', false)))
    : request(context + '/currentUserMenu')
}

// 删除菜单
export function deleteMenu(sysMenuId: string) {
  return request({
    url: context + '/delete',
    data: { sysMenuId },
  })
}

// 新增菜单
export function save(data: any) {
  return request({
    url: context + '/save',
    data,
  })
}

// 更新菜单
export function update(data: any) {
  return request({
    url: context + '/update',
    data,
  })
}
