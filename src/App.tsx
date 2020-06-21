import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute, GuardFunction } from 'react-router-guards'
import Loading from './components/loading'
import Home from './views/home'
import Login from './views/login'
import { getToken } from './utils/_auth'

function App() {
  console.log('APP rendering...')
  const guard: GuardFunction = (to, from, next) => {
    to.location.pathname === '/login' || getToken()
      ? next()
      : next.redirect({
          pathname: '/login',
          state: { redirect: to.location.pathname },
        })
  }
  return (
    <BrowserRouter>
      <Loading />
      <GuardProvider guards={[guard]}>
        <Switch>
          <GuardedRoute path="/" exact component={Home}></GuardedRoute>
          <GuardedRoute path="/login" component={Login}></GuardedRoute>
        </Switch>
      </GuardProvider>
    </BrowserRouter>
  )
}

export default App
