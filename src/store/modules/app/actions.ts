import { Action } from '@/store'
import { AppState } from './state'

export function setSpinning(
  spinning: boolean,
  spinTip = ''
): Action<'setSpinning', Pick<AppState, 'spinning' | 'spinTip'>> {
  return {
    type: 'setSpinning',
    payload: {
      spinning,
      spinTip,
    },
  }
}
