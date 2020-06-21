import { local } from './storage'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user'

export function getToken() {
  return local.get<Token>(TOKEN_KEY)
}

export function setToken(token: Token) {
  local.set(TOKEN_KEY, token)
}

export function removeToken() {
  local.remove(TOKEN_KEY)
}

export function getUserInfo() {
  return local.get<User>(USER_KEY)
}

export function setUserInfo(user: User) {
  local.set(USER_KEY, user)
}

export function removeUserInfo() {
  local.remove(USER_KEY)
}

export function clear() {
  removeToken()
  removeUserInfo()
}
