type Token = string | null

interface User {
  id: string
  name: string
  role: 'admin' | 'normal'
}
