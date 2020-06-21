import React from 'react'
import { RouteComponentProps } from 'react-router'
import { useDispatch } from '@/hooks/redux'
import './index.scss'

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  console.log('Home rendering...')
  const dispatch = useDispatch()
  const logout = () => {
    dispatch({ type: 'resetLoginState' })
    history.push('/login')
  }
  return (
    <div className="home">
      <button style={{ float: 'right' }} onClick={logout}>
        logout
      </button>
      <h1>Hello React</h1>
    </div>
  )
}

export default Home
