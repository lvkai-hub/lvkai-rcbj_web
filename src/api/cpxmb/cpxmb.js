import request from '@/utils/request'

// 查询项目信息列表
export function listCpxmb(query) {
  return request({
    url: '/cpxmb/cpxmb/list',
    method: 'get',
    params: query
  })
}

// 查询项目信息详细
export function getCpxmb(nbxh) {
  return request({
    url: '/cpxmb/cpxmb/' + nbxh,
    method: 'get'
  })
}

// 新增项目信息
export function addCpxmb(data) {
  return request({
    url: '/cpxmb/cpxmb',
    method: 'post',
    data: data
  })
}

// 修改项目信息
export function updateCpxmb(data) {
  return request({
    url: '/cpxmb/cpxmb',
    method: 'put',
    data: data
  })
}

// 删除项目信息
export function delCpxmb(nbxh) {
  return request({
    url: '/cpxmb/cpxmb/' + nbxh,
    method: 'delete'
  })
}
