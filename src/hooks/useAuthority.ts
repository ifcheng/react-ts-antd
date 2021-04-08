import { useContext } from 'react'
import { AuthorityContext } from '@/router/context'

function useAuthority(): string[]
function useAuthority(authority: string): boolean
function useAuthority(authority: string[]): boolean[]
function useAuthority(authority?: string | string[]) {
  const allowed = useContext(AuthorityContext)
  if (authority === void 0) return allowed
  if (typeof authority === 'string') return allowed.includes(authority)
  return authority.map(item => allowed.includes(item))
}

export default useAuthority
