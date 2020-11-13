import { Action, FnAction } from '@/store'
import { fetchCurrentUserMenus } from '@/api/system-management/menu'

export function setSpinning(spinning: boolean, spinTip = ''): Action {
  return {
    type: 'setSpinning',
    payload: {
      spinning,
      spinTip,
    },
  }
}

export function generateRoutes(): FnAction<Promise<void>> {
  return async dispatch => {
    dispatch({
      type: 'setAppRoutes',
      payload: await fetchCurrentUserMenus(),
    })
  }
}
