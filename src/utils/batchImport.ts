/**
 * 批量导入模块
 * @param r require.context()的返回值
 */
export default function batchImport<T = any>(
  r: __WebpackModuleApi.RequireContext
): T[] {
  return r.keys().map(key => {
    const mod = r(key)
    return mod.default ?? mod
  })
}
