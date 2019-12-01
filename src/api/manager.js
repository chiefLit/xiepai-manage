import request from '@/utils/request'

/**
 * 登录
 * @param { username	是	string	用户名 password	是	string	密码} params 
 */
export function login(params) {
  return request({
    url: '/api/bgms/manager/login',
    method: 'post',
    params
  })
}

/**
 * 退出登录
 */
export function getList() {
  return request({
    url: '/api/bgms/manager/logout',
    method: 'post'
  })
}
