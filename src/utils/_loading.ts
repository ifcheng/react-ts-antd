import store from '../store'
import { setSpinning } from 'models/app'

export default {
  show(text?: string): void {
    const spinning = store.getState().app.spinning
    spinning || store.dispatch(setSpinning(true, text))
  },
  close(): void {
    const spinning = store.getState().app.spinning
    spinning && store.dispatch(setSpinning(false))
  },
}
