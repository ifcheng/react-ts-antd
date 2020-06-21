import request from './request'

export function login(data: any) {
  return request({
    method: 'POST',
    url: '/login',
    data,
  })
}
