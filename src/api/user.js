import request from '@/utils/request'

// 用户列表
export function getUserList(data) {
  return request({
    url: '/api/bgms/user/list',
    method: 'post',
    data
  })
}

// 创建用户
export function createUser(data) {
  return request({
    url: '/api/bgms/user/create',
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

// 用户重置密码
export function restPassword(data) {
  return request({
    url: '/api/bgms/user/restPassword',
    method: 'post',
    data
  })
}

// 角色列表
export function getRoleList(data) {
  return request({
    url: '/api/bgms/role/list',
    method: 'post',
    data
  })
}

// 角色详情
export function getRoleDetail(data) {
  return request({
    url: '/api/bgms/role/detail',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/api/bgms/role/update',
    method: 'post',
    data
  })
}

// 菜单树形列表
export function getTreeList(data) {
  return request({
    url: '/api/bgms/menu/treeList',
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
