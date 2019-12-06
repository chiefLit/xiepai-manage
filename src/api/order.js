import request from '@/utils/request'

/**
 * 订单列表
 * @param {*} params 
 */
export function getOrderList(params) {
  return request({
    url: '/api/bgms/order/find2Manage',
    method: 'post',
    params
  })
}

/**
 * 订单详情
 * @param {orderId	是	int	订单ID} params 
 */
export function getOrderDetail(params) {
  return request({
    url: '/api/bgms/order/detail',
    method: 'post',
    params
  })
}

/**
 * 录入核验照片
 * @param {*} params 
 */
export function storeCollect(params) {
  return request({
    url: '/api/bgms/order/store-collect',
    method: 'post',
    params
  })
}

/**
 * 录入清洗效果照片及快递信息
 * @param {*} params 
 */
export function serviceResult(params) {
  return request({
    url: '/api/bgms/order/service-result',
    method: 'post',
    params
  })
}

/**
 * 取消订单
 * @param {*} params 
 */
export function orderCancel(params) {
  return request({
    url: '/api/bgms/order/cancel',
    method: 'post',
    params
  })
}

/**
 * 查看物流信息
 * @param {orderId	是	int	订单ID, trend	是	int	走向 0：用户寄给门店 1：门店寄给用户} params 
 */
export function findOrderExpressLog(params) {
  return request({
    url: '/api/bgms/order/find-order-express-log',
    method: 'post',
    params
  })
}