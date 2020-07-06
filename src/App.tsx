import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { GuardProvider, GuardedRoute, GuardFunction } from 'react-router-guards'
import history from './utils/_history'
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
          state: { from: to.location },
        })
  }
  return (
    <Router history={history}>
      <Loading />
      <GuardProvider guards={[guard]}>
        <Switch>
          <GuardedRoute path="/" exact component={Home}></GuardedRoute>
          <GuardedRoute path="/login" component={Login}></GuardedRoute>
        </Switch>
      </GuardProvider>
    </Router>
  )
}

export default App
