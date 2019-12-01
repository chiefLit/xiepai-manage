import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '', //	int	id
    code: '', //	String	编码
    name: '', //	String	名称
    iconUrl: '', //	String	icon图标
  }]
})

export default [
  {
    url: '/api/bgms/express_company/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 1,
        object: items,
        page: {
          currentPage: 1,
          pageRecords: 20,
          totalPages: 1,
          totalRecords: 1,
          startRecord: 0,
          nextPage: 1,
          previousPage: 1,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  }
]
