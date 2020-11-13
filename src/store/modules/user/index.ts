import produce from 'immer'
import initUserState, { UserState } from './state'
import * as mutations from './mutations'
import { Action } from '@/store'

export * from './actions'
export default produce(
  (state: UserState, action: Action<keyof typeof mutations>) =>
    mutations[action.type]?.(state, action.payload),
  initUserState()
)
