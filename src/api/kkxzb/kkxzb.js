import request from '@/utils/request'

// 查询可靠性报价列表
export function listKkxzb(query) {
  return request({
    url: '/kkxzb/kkxzb/list',
    method: 'get',
    params: query
  })
}

// 查询可靠性报价详细
export function getKkxzb(nbxh) {
  return request({
    url: '/kkxzb/kkxzb/' + nbxh,
    method: 'get'
  })
}

// 新增可靠性报价
export function addKkxzb(data) {
  return request({
    url: '/kkxzb/kkxzb',
    method: 'post',
    data: data
  })
}

// 修改可靠性报价
export function updateKkxzb(data) {
  return request({
    url: '/kkxzb/kkxzb',
    method: 'put',
    data: data
  })
}

// 删除可靠性报价
export function delKkxzb(nbxh) {
  return request({
    url: '/kkxzb/kkxzb/' + nbxh,
    method: 'delete'
  })
}
