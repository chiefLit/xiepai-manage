import request from '@/utils/request'

/**
 * 快递公司列表
 */
export function getExpressCompanyList() {
  return request({
    url: '/api/bgms/express_company/list',
    method: 'post'
  })
}
