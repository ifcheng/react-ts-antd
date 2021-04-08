import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import withDefaultProps from '@/hocs/withDefaultProps'
import { RouteConfig } from '@/router/types'

type Props = {
  route: RouteConfig
} & DefaultProps

type DefaultProps = typeof defaultProps

const defaultProps = {
  isNest: false,
}

const SideMenuItem = withDefaultProps<Props, DefaultProps>(
  defaultProps,
  /*  此处将rest传递给Item和SubMenu是必须的，不然会报异常 */
  ({ route, isNest, ...rest }) => {
    if (route.hidden) return null

    if ((route.routes || []).every(item => item.hidden)) {
      return (
        <Menu.Item key={route.path} {...rest}>
          <Link to={route.path}>{route.title}</Link>
        </Menu.Item>
      )
    }

    return (
      <Menu.SubMenu {...rest} title={route.title} key={route.path}>
        {route.routes!.map(item => (
          <SideMenuItem key={item.path} route={item} isNest />
        ))}
      </Menu.SubMenu>
    )
  }
)

export default React.memo(SideMenuItem)
