import React from 'react'
import { Menu } from 'antd'
import { castDraft } from 'immer'
import { useSelector } from '@/hooks/redux'
import Item from './Item'

const SideMenu: React.FC = () => {
  const sideMenuCollapsed = useSelector(state => state.app.sideMenuCollapsed)
  const routes = useSelector(state => state.app.routes)
  if (!routes) return null
  return (
    <Menu
      mode="inline"
      inlineCollapsed={sideMenuCollapsed}
      defaultOpenKeys={['1']}
    >
      {routes.map(route => (
        <Item key={route.path} route={castDraft(route)} />
      ))}
    </Menu>
  )
}

export default React.memo(SideMenu)
