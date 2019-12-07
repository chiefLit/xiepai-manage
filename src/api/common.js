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

/**
 * 快递公司列表
 */
export function uploadFile(file, extData) {
  const fd = new FormData()
  for (const key in extData) {
    fd.append(key, extData[key])
  }
  fd.append('timestamp', +new Date())
  fd.append('file', file)
  return request.post('/file/upload', fd)
}
