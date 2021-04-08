import React from 'react'
import { Menu, Layout, Drawer } from 'antd'
import { castDraft } from 'immer'
import { useSelector, useDispatch } from '@/hooks/redux'
import Item from './Item'

const { Sider } = Layout

const InlineMenu: React.FC = () => {
  const routes = useSelector(state => state.app.routes)
  if (!routes) return null
  return (
    <Menu mode="inline" theme="dark" defaultOpenKeys={['1']}>
      {routes.map(route => (
        <Item key={route.path} route={castDraft(route)} />
      ))}
    </Menu>
  )
}

const SideMenu: React.FC = () => {
  const dispatch = useDispatch()
  const device = useSelector(state => state.app.device)
  const sideMenuCollapsed = useSelector(state => state.app.sideMenuCollapsed)

  return device === 'desktop' ? (
    <Sider collapsible collapsed={sideMenuCollapsed} trigger={null}>
      <InlineMenu />
    </Sider>
  ) : (
    <Drawer
      placement="left"
      closable={false}
      visible={!sideMenuCollapsed}
      onClose={() => dispatch({ type: 'toggleSideMenu' })}
    >
      <InlineMenu />
    </Drawer>
  )
}

export default React.memo(SideMenu)
