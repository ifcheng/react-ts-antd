import { getUserInfo } from '@/utils/_auth'

export interface UserState {
  name?: string
  avatar?: string
  account?: string
  areaCode?: string
}

export default function initUserState(): UserState {
  const { name, avatar } = getUserInfo() || {}
  return { name, avatar }
}
