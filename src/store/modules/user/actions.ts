import { FnAction } from '@/store'
import * as api from '@/api/system-management/user'
import * as auth from '@/utils/_auth'

export function login(data: any): FnAction<Promise<void>> {
  return async dispatch => {
    auth.setToken(await api.login(data))
    dispatch(setUserInfo(await api.findUserInfo(data.username)))
  }
}

export function setUserInfo(data: any): FnAction<void> {
  return dispatch => {
    auth.setUserInfo({
      account: data.userAccount,
      name: data.userName,
      avatar: data.userPhoto,
      areaCode: data.areaCode,
    })
    dispatch({
      type: 'setUserInfo',
      payload: {
        name: data.userName,
        avatar: data.userPhoto,
      },
    })
  }
}
