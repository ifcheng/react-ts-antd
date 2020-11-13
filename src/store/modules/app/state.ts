import { RouteConfig } from '@/router/types'

export interface AppState {
  /** 是否显示加载指示器 */
  spinning: boolean
  /** 加载文字 */
  spinTip: string
  /** 侧边菜单是否折叠 */
  sideMenuCollapsed: boolean
  /** 设备类型 */
  device: 'desktop' | 'mobile'
  /** 动态路由配置 */
  routes: RouteConfig[] | null
}

export default function initAppState(): AppState {
  return {
    spinning: false,
    spinTip: '',
    sideMenuCollapsed: false,
    device: 'desktop',
    routes: null,
  }
}
