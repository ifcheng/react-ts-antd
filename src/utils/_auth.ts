import { local } from './storage'
import { UserState } from 'models/user/state'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user'

export function getToken() {
  return local.get<string>(TOKEN_KEY)
}

export function setToken(token: string) {
  local.set(TOKEN_KEY, token, '12h')
}

export function removeToken() {
  local.remove(TOKEN_KEY)
}

export function getUserInfo() {
  return local.get<UserState>(USER_KEY)
}

export function setUserInfo(user: UserState) {
  local.set(USER_KEY, user)
}

export function removeUserInfo() {
  local.remove(USER_KEY)
}

export function clear() {
  removeToken()
  removeUserInfo()
}
