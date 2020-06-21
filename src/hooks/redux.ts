import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { StoreState, Action } from '../store'

export function useDispatch() {
  return useReduxDispatch<ThunkDispatch<StoreState, undefined, Action>>()
}

export function useSelector<R>(
  selector: (state: StoreState) => R,
  equalityFn?: (a: R, b: R) => boolean
) {
  return useReduxSelector<StoreState, R>(selector, equalityFn)
}
