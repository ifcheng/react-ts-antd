export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isPlainObject(val: any) {
  return Object.prototype.toString.call(val) === '[object Object]'
}
