import request from '@/utils/request'

/**
 * 商品列表
 * @param {*} data 
 */
export function getGoodzList(data) {
  return request({
    url: '/api/bgms/goodz/find',
    method: 'post',
    data
  })
}

/**
 * 商品详情
 * @param {*} data 
 */
export function getGoodzDetail(data) {
  return request({
    url: '/api/bgms/goodz/detail',
    method: 'post',
    data
  })
}

/**
 * 修改商品
 * @param {*} data 
 */
export function updateGoodz(data) {
  return request({
    url: '/api/bgms/goodz/update',
    method: 'post',
    data
  })
}