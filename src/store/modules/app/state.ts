export interface AppState {
  spinning: boolean
  spinTip: string
}

export default function initAppState(): AppState {
  return {
    spinning: false,
    spinTip: '',
  }
}
