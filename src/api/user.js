import request from '@/utils/request'

// 角色列表
export function getRoleList(data) {
  return request({
    url: '/api/bgms/role/list',
    method: 'post',
    data
  })
}

// 用户列表
export function getUserList(data) {
  return request({
    url: '/api/bgms/user/list',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/api/bgms/user/update',
    method: 'post',
    data
  })
}

// 创建用户
export function restPassword(data) {
  return request({
    url: '/api/bgms/user/restPassword',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
