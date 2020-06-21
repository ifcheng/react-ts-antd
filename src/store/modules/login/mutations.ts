import { castImmutable } from 'immer'
import initLoginState, { LoginState } from './state'
import * as auth from '@/utils/_auth'

export function setToken(state: LoginState, token: Token) {
  state.token = token
  auth.setToken(token)
}

export function setUserInfo(state: LoginState, user: User) {
  state.user = user
  auth.setUserInfo(user)
}

export function resetLoginState() {
  auth.clear()
  return castImmutable(initLoginState())
}
