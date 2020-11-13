import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './router/history'
import Loading from './components/loading'
import Login from './views/login'
import Layout from '@/layout'
import { FancyRoute } from './router'

function App() {
  console.log('APP rendering...')
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <Route path="/login" component={Login} />
        {}
        <Route>
          <h2>Not Found</h2>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
