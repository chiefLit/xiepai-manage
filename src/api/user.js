import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/bgms/manager/login',
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

export function logout() {
  return request({
    url: '/api/bgms/manager/logout',
    method: 'post'
  })
}
