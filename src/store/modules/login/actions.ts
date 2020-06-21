import { FnAction } from '@/store'
import * as api from '@/api'

export function login(data: { userName: string }): FnAction<Promise<void>> {
  return async dispatch => {
    const ret = await api.login(data)
    dispatch({ type: 'setToken', payload: ret.token })
    dispatch({ type: 'setUserInfo', payload: ret.user })
  }
}
