import request from '@/utils/request'

// 查询组件报价列表
export function listZjbj(query) {
  return request({
    url: '/zjbj/zjbj/list',
    method: 'get',
    params: query
  })
}

// 查询组件报价详细
export function getZjbj(nbxh) {
  return request({
    url: '/zjbj/zjbj/' + nbxh,
    method: 'get'
  })
}

// 新增组件报价
export function addZjbj(data) {
  return request({
    url: '/zjbj/zjbj',
    method: 'post',
    data: data
  })
}

// 修改组件报价
export function updateZjbj(data) {
  return request({
    url: '/zjbj/zjbj',
    method: 'put',
    data: data
  })
}

// 删除组件报价
export function delZjbj(nbxh) {
  return request({
    url: '/zjbj/zjbj/' + nbxh,
    method: 'delete'
  })
}

// 根据物料编码查询物料信息
export function getZjbjBywlbh(wlbh) {
  return request({
    url: '/zjbj/zjbj/getZjbjBywlbh/' + wlbh,
    method: 'get'
  })
}
