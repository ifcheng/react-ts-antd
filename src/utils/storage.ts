function stringToDate(str: string): Date {
  const matchs = str.match(/^\d+(\.\d+)?([hdy])$/)
  if (matchs) {
    const now = Date.now()
    const maxAge = parseFloat(str)
    return matchs[2] === 'h'
      ? new Date(now + maxAge * 3600 * 1000)
      : matchs[2] === 'd'
      ? new Date(now + maxAge * 24 * 3600 * 1000)
      : new Date(now + maxAge * 365 * 24 * 3600 * 1000)
  }
  const date = new Date(str)
  return isNaN(date.getTime()) ? new Date(0) : date
}

interface Ref<T = any> {
  value: T
  expires?: string
}

type Expires = number | string | Date

function ref<T = any>(value: T, expires?: Expires): Ref<T> {
  let sExpires: Date | undefined
  if (typeof expires === 'number') {
    sExpires = new Date(Date.now() + expires * 1000)
  } else if (typeof expires === 'string') {
    sExpires = stringToDate(expires)
  } else if (expires instanceof Date) {
    sExpires = expires
  }
  return {
    value,
    ...(sExpires && { expires: sExpires.toUTCString() }),
  }
}

class SmartStorage {
  constructor(public native: Storage) {}
  get<R>(key: string): R | null {
    let res = this.native.getItem(key)
    try {
      const { value, expires } = JSON.parse(res as string) as Ref
      if (expires && new Date(expires).getTime() <= Date.now()) {
        this.remove(key)
        res = null
      } else {
        res = value
      }
    } catch {}
    return res as any
  }
  set(key: string, value: any, expires?: Expires): void {
    expires = this.native === localStorage ? expires : void 0
    this.native.setItem(key, JSON.stringify(ref(value, expires)))
  }
  remove(key: string | string[]): void {
    if (Array.isArray(key)) {
      key.forEach(item => this.native.removeItem(item))
    } else {
      this.native.removeItem(key)
    }
  }
  clear(): void {
    this.native.clear()
  }
}

export const local = new SmartStorage(localStorage)
export const session = new SmartStorage(sessionStorage)
