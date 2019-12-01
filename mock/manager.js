export default [
  {
    url: '/api/bgms/manager/login',
    type: 'post',
    response: config => {
      return {
        'code': 1,
        'message': '成功!',
        'object': {
          'accessToken': '0000010sd0948asdfku'
        },
        'map': {}
      }
    }
  },
  {
    url: '/api/bgms/manager/logout',
    type: 'post',
    response: config => {
      return {
        'code': 1,
        'message': '成功!',
        'map': {}
      }
    }
  }
]
