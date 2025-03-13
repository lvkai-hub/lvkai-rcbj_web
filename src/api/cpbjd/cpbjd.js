import request from '@/utils/request'

// 查询产品报价单列表
export function listCpbjd(query) {
  return request({
    url: '/cpbjd/cpbjd/list',
    method: 'get',
    params: query
  })
}

// 查询产品报价单详细
export function getCpbjd(nbxh) {
  return request({
    url: '/cpbjd/cpbjd/' + nbxh,
    method: 'get'
  })
}

// 新增产品报价单
export function addCpbjd(data) {
  return request({
    url: '/cpbjd/cpbjd',
    method: 'post',
    data: data
  })
}

// 修改产品报价单
export function updateCpbjd(data) {
  return request({
    url: '/cpbjd/cpbjd',
    method: 'put',
    data: data
  })
}

// 删除产品报价单
export function delCpbjd(nbxh) {
  return request({
    url: '/cpbjd/cpbjd/' + nbxh,
    method: 'delete'
  })
}


// 根据提交的报价单查询对应的bom明细
export function getBommxByCpbjd(data) {
  return request({
    url: '/cpbjd/cpbjd/getBommxByCpbjd',
    method: 'post',
    data: data
  })
}

// 根据内部序号获取文件url
export function getWjurlByNbxh(nbxh) {
  return request({
    url: '/cpbjd/cpbjd/getWjurlByNbxh/' + nbxh,
    method: 'get'
  })
}
