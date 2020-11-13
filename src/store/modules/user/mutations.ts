import { castImmutable } from 'immer'
import initUserState, { UserState } from './state'
import * as auth from '@/utils/_auth'

export function setUserInfo(state: UserState, { name, avatar }: UserState) {
  state.name = name
  state.avatar = avatar
}

export function resetUserState() {
  auth.clear()
  return castImmutable(initUserState())
}
