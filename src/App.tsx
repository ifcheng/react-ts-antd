import React, { Suspense } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './router/history'
import Loading from './components/loading'
import Login from './views/login'
import Layout from '@/layout'

function App() {
  console.log('APP rendering...')
  return (
    <Router history={history}>
      <Suspense fallback={null}>
        <Loading />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/404">
            <h2>Not Found</h2>
          </Route>
          <Route>
            <Layout />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
