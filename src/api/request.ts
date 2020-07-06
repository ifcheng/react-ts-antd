import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
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
  loader?: boolean | string
  /** 错误消息 */
  errorMessage?: string
  /** 错误等级：0 silent; 1 message.warn; 2 message.error */
  errorLevel?: ErrorLevel
  /** 是否返回响应头信息 */
  getResponseHeaders?: boolean
}

const config: RequestConfig = {
  baseURL: process.env.REACT_APP_BASE_API,
  errorLevel: 2,
  errorMessage: '系统开小差了，请稍候再试',
  // timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config)
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
    const { data, headers, config } = response
    return (config as RequestConfig).getResponseHeaders
      ? { data, headers }
      : data
  },
  function (error) {
    // Do something with response error
    if (error.response?.status === 401) {
      auth.clear()
      history.replace({
        pathname: '/login',
        state: { from: history.location },
      })
      return new Promise(() => {})
    }
    return Promise.reject(
      new Error(error.response?.data?.message || error.config.errorMessage)
    )
  }
)

export default function request(config: string | RequestConfig): Promise<any> {
  if (typeof config === 'string') config = { url: config }
  const { loader, errorLevel = 2, transformRequest, transformResponse } = config
  config.transformRequest = [
    ...axios.defaults.transformRequest,
    ...transformRequest,
  ]
  config.transformResponse = [
    ...axios.defaults.transformResponse,
    ...transformResponse,
  ]
  const loadingText = typeof loader === 'string' ? loader : undefined
  loader && Loading.show(loadingText)
  return _axios(config)
    .then(data => {
      loader && Loading.close()
      return data
    })
    .catch(err => {
      Loading.close()
      reportError(err, errorLevel)
      return Promise.reject(err)
    })
}

function reportError(err: Error, level: ErrorLevel): void {
  if (level === 0) return
  const type = level === 2 ? 'error' : 'warn'
  message[type](err.message)
}
