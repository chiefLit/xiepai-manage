import request from '@/utils/request'

/**
 * 订单列表
 * @param {*} data 
 */
export function getOrderList(data) {
  return request({
    url: '/api/bgms/order/find2Manage',
    method: 'post',
    data
  })
}

/**
 * 订单详情
 * @param {orderId	是	int	订单ID} data 
 */
export function getOrderDetail(data) {
  return request({
    url: '/api/bgms/order/detail',
    method: 'post',
    data
  })
}

/**
 * 录入核验照片
 * @param {*} data 
 */
export function storeCollect(data) {
  return request({
    url: '/api/bgms/order/store-collect',
    method: 'post',
    data
  })
}

/**
 * 录入清洗效果照片及快递信息
 * @param {*} data 
 */
export function serviceResult(data) {
  return request({
    url: '/api/bgms/order/service-result',
    method: 'post',
    data
  })
}

/**
 * 取消订单
 * @param {*} data 
 */
export function orderCancel(data) {
  return request({
    url: '/api/bgms/order/cancel',
    method: 'post',
    data
  })
}

/**
 * 查看物流信息
 * @param {orderId	是	int	订单ID, trend	是	int	走向 0：用户寄给门店 1：门店寄给用户} data 
 */
export function findOrderExpressLog(data) {
  return request({
    url: '/api/bgms/order/find-order-express-log',
    method: 'post',
    data
  })
}

/**
 * 门店订单列表 1.1
 * @param {orderId	是	int	订单ID, trend	是	int	走向 0：用户寄给门店 1：门店寄给用户} data 
 */
export function getOrderListByStore(data) {
  return request({
    url: '/api/bgms/order/find2ManageWithStore',
    method: 'post',
    data
  })
}