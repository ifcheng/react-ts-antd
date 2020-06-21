export interface LoginState {
  token: Token
  user: User
}

export default function initLoginState(): LoginState {
  return {
    token: '',
    user: {
      id: '',
      name: '',
      role: 'normal',
    },
  }
}
