export default [
  {
    url: '/api/bgms/express_company/list',
    type: 'post',
    response: config => {
      return {
        code: 1,
        object: [
          {
            id: 1, //	int	id
            code: '1', //	String	编码
            name: '顺丰', //	String	名称
            iconUrl: '1231231' //	String	icon图标
          },
          {
            id: 2, //	int	id
            code: '2', //	String	编码
            name: '圆通', //	String	名称
            iconUrl: '1231231' //	String	icon图标
          },
          {
            id: 3, //	int	id
            code: '3', //	String	编码
            name: '韵达', //	String	名称
            iconUrl: '1231231' //	String	icon图标
          }
        ],
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
  },
  {
    url: '/api/file/upload',
    type: 'post',
    response: config => {
      // console.log(config)
      return {
        code: 1,
        object: {
          id: 2000059,
          storePath: '/2019-11-19/df1ecca6-c677-496e-ac16-a95f5f4f9a1e.png',
          createTime: 1574134839407,
          fileSuffix: 'png',
          fileName: 'test',
          status: 2,
          storeFileName: 'df1ecca6-c677-496e-ac16-a95f5f4f9a1e',
          viewPath: 'https://dev-file.sneakerpai.com/2019-11-19/df1ecca6-c677-496e-ac16-a95f5f4f9a1e.png'
        }
      }
    }
  }
]
