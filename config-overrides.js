const path = require('path')
const MockService = require('webpack-mock-service').default
const {
  override,
  addLessLoader,
  addWebpackAlias,
  fixBabelImports,
} = require('customize-cra')

function resolve(...paths) {
  return path.resolve(process.cwd(), ...paths)
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': resolve('src'),
      models: resolve('src/store/modules'),
    }),
    addLessLoader({
      lessOptions: {
        modifyVars: resolve('package.json').theme,
        javascriptEnabled: true,
      },
    }),
    fixBabelImports('antd', {
      libraryDirectory: 'es',
      style: true,
    })
  ),
  devServer(configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      const before = config.before
      config.before = function (app, server) {
        before(app, server)
        new MockService(app, {
          main: resolve('mock/index.js'),
          watchPaths: resolve('mock'),
          baseUrl: process.env.REACT_APP_BASE_API,
        })
      }
      return config
    }
  },
}
