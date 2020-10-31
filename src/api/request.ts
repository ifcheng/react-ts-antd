import axios, { AxiosRequestConfig } from 'axios'
import { message as Message } from 'antd'
import Loading from '../utils/_loading'
import history from '../utils/_history'
import * as auth from '../utils/_auth'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/** 错误等级：0 silent; 1 message.warn; 2 message.error */
type ErrorLevel = 0 | 1 | 2

interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示加载指示器 */
  indicator?: boolean | string
  /** 错误消息 */
  errorMessage?: string
  /** 错误等级：0 silent; 1 message.warn; 2 message.error */
  errorLevel?: ErrorLevel
}

const _axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  method: 'POST',
})

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = auth.getToken()
    token && (config.headers.token = token)
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    const data = response.data
    if (!data || data instanceof Blob) return data
    if (data.code === '000') return data.data || data
    if (data.code === '998') {
      if (auth.getToken()) {
        // store.dispatch('user/clean')
        history.replace({
          pathname: '/login',
          state: {
            redirect: history.location,
          },
        })
        Message.warning('您已被登出，请重新登录')
      }
      return new Promise(() => {})
    }
    const error = new Error(data.message)
    ;(error as any).report = true
    return Promise.reject(error)
  },
  function (error) {
    // Do something with response error
    if (axios.isCancel(error)) error.report = false
    return Promise.reject(error)
  }
)

/**
 * 报告错误消息
 */
export function reportError(
  err: Error,
  level: ErrorLevel,
  fallback = '系统开小差了，请稍候再试'
) {
  if (level === 0 || (err as any).report === false) return
  const type = level === 2 ? 'error' : 'warning'
  const message = (err as any).report && err.message
  Message[type](message || fallback)
}

/**
 * axios封装
 * @param config 配置对象或请求url
 * @param data 请求数据，仅用于`POST` `PUT` `PATCH`方法
 * @param interceptor 拦截器，用于修改配置对象
 */
export default function request(
  config: string | RequestConfig,
  data?: any,
  interceptor?: (config: RequestConfig) => void | RequestConfig
): Promise<any> {
  if (typeof config === 'string') config = { url: config, data }
  if (typeof interceptor === 'function') {
    config = interceptor(config) || config
  }
  config.transformRequest = ([] as any[]).concat(
    config.transformRequest || [],
    axios.defaults.transformRequest
  )

  // 解构属性为自定义扩展属性
  const { indicator, errorMessage, errorLevel = 2 } = config
  const loadingText = typeof indicator === 'string' ? indicator : undefined
  indicator && Loading.show(loadingText)

  return _axios(config)
    .then(data => {
      indicator && Loading.close()
      return data
    })
    .catch(err => {
      Loading.close()
      reportError(err, errorLevel, errorMessage)
      return Promise.reject(err)
    })
}

request.submit = function submit(config: string | RequestConfig, data?: any) {
  return request(config, data, (config: RequestConfig) => {
    config.indicator = true
  })
}
