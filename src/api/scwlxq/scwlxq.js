import request from '@/utils/request'

// 查询生产物料需求列表
export function listScwlxq(query) {
  return request({
    url: '/system/scwlxq/list',
    method: 'get',
    params: query
  })
}

// 查询生产物料需求详细
export function getScwlxq(nbxh) {
  return request({
    url: '/system/scwlxq/' + nbxh,
    method: 'get'
  })
}

// 新增生产物料需求
export function addScwlxq(data) {
  return request({
    url: '/system/scwlxq',
    method: 'post',
    data: data
  })
}

// 修改生产物料需求
export function updateScwlxq(data) {
  return request({
    url: '/system/scwlxq',
    method: 'put',
    data: data
  })
}

// 删除生产物料需求
export function delScwlxq(nbxh) {
  return request({
    url: '/system/scwlxq/' + nbxh,
    method: 'delete'
  })
}

// 根据提交的物料需求查询对应的bom明细
export function getBommxByScwlxq(data) {
  return request({
    url: '/system/scwlxq/getBommxByScwlxq',
    method: 'post',
    data: data
  })
}
