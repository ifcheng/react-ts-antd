import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk, { ThunkAction } from 'redux-thunk'
import { reducers, mutations } from './modules'

export type ActionTypes = keyof typeof mutations

export interface Action<T extends string = ActionTypes, P = any> {
  type: T
  payload?: P
}

export type FunctionAction<R> = ThunkAction<R, StoreState, undefined, Action>

export type FnAction<R> = FunctionAction<R>

export type Reducers = typeof reducers

export type StoreState = {
  readonly [K in keyof Reducers]: ReturnType<Reducers[K]>
}

export default createStore<StoreState, Action, {}, {}>(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(thunk))
)
