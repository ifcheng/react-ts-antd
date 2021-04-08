import React from 'react'
import useAuthority from '@/hooks/useAuthority'

export default function () {
  console.log('authority: ', useAuthority())
  return <h3>航材接货列表页</h3>
}
