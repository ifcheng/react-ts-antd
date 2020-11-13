import { AppState } from './state'
import { RouteConfig } from '@/router/types'

export function setSpinning(state: AppState, { spinning, spinTip }: any) {
  state.spinning = spinning
  state.spinTip = spinTip
}

export function toggleSideMenu(state: AppState) {
  state.sideMenuCollapsed = !state.sideMenuCollapsed
}

export function setAppRoutes(state: AppState, routes: RouteConfig[] | null) {
  state.routes = routes
}
