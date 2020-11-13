import React, { useContext, useMemo } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { RouteConfig } from './types'
import { AuthorityContext } from './context'

const FancyRoute: React.FC<RouteConfig> = route => {
  const authorities = useContext(AuthorityContext)
  const _authorities = useMemo(
    () => authorities.concat(route.authorities || []),
    [authorities, route.authorities]
  )
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        const { redirect, component, routes = [] } = route
        if (redirect && redirect !== props.match.url) {
          return <Redirect to={redirect} />
        }
        if (!component) return null
        const Component = React.lazy(() => import(component))
        return (
          <AuthorityContext.Provider value={_authorities}>
            <Component {...props}>
              {routes.map(item => (
                <FancyRoute key={item.path} {...item} />
              ))}
            </Component>
          </AuthorityContext.Provider>
        )
      }}
    />
  )
}

export default FancyRoute
