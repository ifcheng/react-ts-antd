import { useEffect } from 'react'
import { castDraft } from 'immer'
import { useSelector, useDispatch } from '@/hooks/redux'
import { generateRoutes } from 'models/app'

export default function useRoutes() {
  const dispatch = useDispatch()
  const routes = useSelector(state => state.app.routes)
  useEffect(() => {
    if (!routes) {
      dispatch(generateRoutes())
    }
  })
  return castDraft(routes)
}
