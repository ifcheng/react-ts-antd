import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import Loading from '../utils/_loading'
;(window as any).Loading = Loading

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  baseURL: process.env.baseURL,
  timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean
  loadingText?: string
  errMsg?: false | string
}

export default function request(config: RequestConfig | string): Promise<any> {
  if (typeof config === 'string') {
    config = { url: config }
  }
  const { loading, loadingText, errMsg } = config
  loading && Loading.show(loadingText)
  return _axios(config)
    .then(data => {
      loading && Loading.close()
      return data
    })
    .catch(err => {
      Loading.close()
      if (errMsg !== false) {
        message.error(getErrMsg(err, errMsg))
      }
      return Promise.reject(err)
    })
}

export function getErrMsg(err: Error, fallback = '请求异常') {
  return err.message || fallback
}
