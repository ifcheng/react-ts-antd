/**
 * 批量导入模块
 * @param r require.context()的返回值
 */
export default function batchImport(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(key => {
    const mod = r(key)
    return mod.default ?? mod
  })
}
