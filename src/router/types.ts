export interface RouteConfig {
  path: string
  exact?: boolean
  component?: string
  redirect?: string
  routes?: RouteConfig[]
  hidden?: boolean
  title?: string
  icon?: string
  breadcrumb?: string | boolean
  authorities?: string[]
  accessControl?: boolean
}
