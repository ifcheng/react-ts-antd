import React from 'react'
import { RouteComponentProps } from 'react-router'
import { login } from 'models/login'
import { useDispatch } from '@/hooks/redux'

const Login: React.FC<RouteComponentProps> = function ({ history, location }) {
  const dispatch = useDispatch()
  const submit = async () => {
    await dispatch(login({ userName: 'admin' }))
    history.push((location.state as any)?.redirect || '/')
  }
  return <button onClick={submit}>login</button>
}

export default Login
