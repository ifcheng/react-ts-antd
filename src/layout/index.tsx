import React from 'react'
import { Layout, Drawer } from 'antd'
import SideMenu from './components/SideMenu'
import useRoutes from './useRoutes'
import { useSelector, useDispatch } from '@/hooks/redux'

const { Sider, Header, Content } = Layout

const FancyLayout: React.FC = props => {
  const routes = useRoutes()
  const dispatch = useDispatch()
  const device = useSelector(state => state.app.device)
  const sideMenuCollapsed = useSelector(state => state.app.sideMenuCollapsed)

  if (!routes) return null
  return (
    <Layout>
      {device === 'desktop' ? (
        <Sider>
          <SideMenu />
        </Sider>
      ) : (
        <Drawer
          placement="left"
          closable={false}
          visible={!sideMenuCollapsed}
          onClose={() => dispatch({ type: 'toggleSideMenu' })}
        >
          <SideMenu />
        </Drawer>
      )}
      <Layout>
        <Header></Header>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default FancyLayout
