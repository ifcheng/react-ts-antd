import produce from 'immer'
import initAppState, { AppState } from './state'
import * as mutations from './mutations'
import { Action } from '@/store'

export * from './actions'
export default produce(
  (state: AppState, action: Action<keyof typeof mutations>) =>
    mutations[action.type]?.(state, action.payload),
  initAppState()
)
