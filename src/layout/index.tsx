import React from 'react'
import { Layout } from 'antd'
import SideMenu from './components/SideMenu'
import Navbar from './components/Navbar'
import { FancyRoute } from '@/router'
import useRoutes from './useRoutes'

const { Header, Content } = Layout

const FancyLayout: React.FC = () => {
  console.log('Layout rendering...')
  const routes = useRoutes()

  if (!routes) return null
  return (
    <Layout>
      <SideMenu />
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          {routes.map(route => (
            <FancyRoute key={route.path} {...route} />
          ))}
        </Content>
      </Layout>
    </Layout>
  )
}

export default FancyLayout
