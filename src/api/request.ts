import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { message } from 'antd'
import Loading from '../utils/_loading'
import history from '../utils/_history'
import * as auth from '../utils/_auth'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_API,
  timeout: 10 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

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
    return response.data
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 401) {
      auth.clear()
      history.replace({
        pathname: '/login',
        state: { from: history.location.pathname },
      })
      return new Promise(() => {})
    }
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

function axiosErrMsg(err: AxiosError): string | undefined {
  return err.response?.data?.message
}

export function getErrMsg(
  err: Error,
  fallback = '系统开小差了，请稍候再试'
): string {
  return axiosErrMsg(err as AxiosError) || err.message || fallback
}
