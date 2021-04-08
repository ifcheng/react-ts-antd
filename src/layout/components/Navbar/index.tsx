import React, { useCallback } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useSelector, useDispatch } from '@/hooks/redux'

const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const sideMenuCollapsed = useSelector(state => state.app.sideMenuCollapsed)
  const toggleCollapsed = useCallback(
    () => dispatch({ type: 'toggleSideMenu' }),
    [dispatch]
  )

  return (
    <div>
      <Button onClick={toggleCollapsed}>
        {sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
  )
}

export default React.memo(Navbar)
