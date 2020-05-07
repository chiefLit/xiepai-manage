import request from '@/utils/request'

/**
 * 菜单树形列表
 * @param {*} data 
 */
export function getTreeList(data) {
  return request({
    url: '/api/bgms/menu/treeList',
    method: 'post',
    data
  })
}