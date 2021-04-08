import React from 'react'
import useAuthority from '@/hooks/useAuthority'

export default function () {
  console.log('authority: ', useAuthority())
  return <h3>航材接货新增页</h3>
}
