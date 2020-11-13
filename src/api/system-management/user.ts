import request from '../request'

const context = '/coms/admin/sys/user'

// 登录验证码地址
export const VALIDATE_CODE_URL = '/coms/gate/validateCode'

export function login(data: any) {
  return request({
    url: '/coms/login',
    data,
  }).then(data => data.token)
}

export function logout() {
  return request('/coms/logout')
}

// 创建用户
export function addUser(data: any) {
  return request.submit({
    url: context + '/add',
    data,
  })
}

// 编辑用户
export function updateUser(data: any) {
  return request.submit({
    url: context + '/updateUser',
    data,
  })
}

// 删除用户
export function deleteUser(userAccount: string) {
  return request({
    url: context + '/delete',
    data: { userAccount },
  })
}

// 禁用用户
export function disableUser(account: string) {
  return request({
    url: context + '/disable',
    data: { account },
  })
}

// 启用用户
export function enableUser(account: string) {
  return request({
    url: context + '/able',
    data: { account },
  })
}

// 重置密码
export function resetPassword(data: any) {
  return request({
    url: context + '/reset',
    data,
  })
}

// 重置密码验证码
export function getValidateCode() {
  return request({
    method: 'GET',
    url: '/coms/gate/innerCode',
    responseType: 'blob',
  })
}

// 用户列表分页查询
export function fetchUserList(data: any) {
  return request({
    url: context + '/findPageList',
    data,
  })
}

// 查询单个用户信息
export function findUserInfo(userAccount: string) {
  return request({
    url: context + '/findUserInfo',
    data: { userAccount },
  })
}

// 获取用户头像
export function getUserAvatar(url: string) {
  return request({
    url: context + '/findPhoto',
    data: { url },
    responseType: 'blob',
  })
}

// 头像上传地址
export const AVATAR_UPLOAD_URL = context + '/uploadPhoto'
