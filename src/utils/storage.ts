class SmartStorage {
  constructor(public native: Storage) {}
  get<R>(key: string): R | null {
    let res = this.native.getItem(key)
    try {
      res = JSON.parse(res as string).value
    } catch {}
    return res as any
  }
  set(key: string, value: any): void {
    if (typeof value !== 'string') {
      value = JSON.stringify({ value })
    }
    this.native.setItem(key, value)
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
