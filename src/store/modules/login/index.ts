import produce from 'immer'
import initLoginState, { LoginState } from './state'
import * as mutations from './mutations'
import { Action } from '@/store'

export * from './actions'
export default produce(
  (state: LoginState, action: Action<keyof typeof mutations>) =>
    mutations[action.type]?.(state, action.payload),
  initLoginState()
)
