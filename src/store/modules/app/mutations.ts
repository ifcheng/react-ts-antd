import { AppState } from './state'

export function setSpinning(
  state: AppState,
  { spinning, spinTip }: Pick<AppState, 'spinning' | 'spinTip'>
) {
  state.spinning = spinning
  state.spinTip = spinTip
}
