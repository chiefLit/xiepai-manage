import request from '@/utils/request'

// 平台流水
export function findPlatformFundlog(data) {
  return request({
    url: '/api/bgms/fundlog/find_platform',
    method: 'post',
    data
  })
}

// 门店流水
export function findStoreFundlog(data) {
  return request({
    url: '/api/bgms/fundlog/find_store',
    method: 'post',
    data
  })
}