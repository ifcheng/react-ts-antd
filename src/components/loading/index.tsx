import React from 'react'
import { Spin } from 'antd'
import { useSelector } from '@/hooks/redux'
import './index.css'

export default function Loading() {
  const spinning = useSelector(state => state.app.spinning)
  const spinTip = useSelector(state => state.app.spinTip)
  return spinning ? (
    <Spin className="loading-wrapper" tip={spinTip} delay={300} size="large" />
  ) : null
}
