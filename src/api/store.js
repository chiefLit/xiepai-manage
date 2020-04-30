import request from '@/utils/request'

/**
 * 门店列表
 * @param {*} data 
 */
export function getStoreList(data) {
  return request({
    url: '/api/bgms/store/list',
    method: 'post',
    data
  })
}

/**
 * 门店详情
 * @param {*} data 
 */
export function getStoreDetail(data) {
  return request({
    url: '/api/bgms/store/detail',
    method: 'post',
    data
  })
}

/**
 * 修改门店
 * @param {*} data 
 */
export function updateStore(data) {
  return request({
    url: '/api/bgms/store/update',
    method: 'post',
    data
  })
}
