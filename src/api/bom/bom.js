import request from '@/utils/request'

// 查询BOM列表
export function listBom(query) {
  return request({
    url: '/bom/bom/list',
    method: 'get',
    params: query
  })
}

// 查询BOM详细
export function getBom(nbxh) {
  return request({
    url: '/bom/bom/' + nbxh,
    method: 'get'
  })
}

// 新增BOM
export function addBom(data) {
  return request({
    url: '/bom/bom',
    method: 'post',
    data: data
  })
}

// 修改BOM
export function updateBom(data) {
  return request({
    url: '/bom/bom',
    method: 'put',
    data: data
  })
}

// 删除BOM
export function delBom(nbxh) {
  return request({
    url: '/bom/bom/' + nbxh,
    method: 'delete'
  })
}
