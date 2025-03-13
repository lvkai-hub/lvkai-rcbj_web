import request from '@/utils/request'

// 查询物料信息列表
export function listWlxx(query) {
  return request({
    url: '/wlxx/wlxx/list',
    method: 'get',
    params: query
  })
}

// 查询物料信息详细
export function getWlxx(nbxh) {
  return request({
    url: '/wlxx/wlxx/' + nbxh,
    method: 'get'
  })
}

// 新增物料信息
export function addWlxx(data) {
  return request({
    url: '/wlxx/wlxx',
    method: 'post',
    data: data
  })
}

// 修改物料信息
export function updateWlxx(data) {
  return request({
    url: '/wlxx/wlxx',
    method: 'put',
    data: data
  })
}

// 删除物料信息
export function delWlxx(nbxh) {
  return request({
    url: '/wlxx/wlxx/' + nbxh,
    method: 'delete'
  })
}
//文件删除
export function delWjsc(nbxh) {
  return request({
    url: '/wlxx/wlxx/delWj/' + nbxh,
    method: 'get',
  })
}
//文件下载
//文件下载
export function downloadByIO(data) {
  return request({
    url: '/common/downloadByIO',
    method: 'post',
    data: data,
    responseType: "blob"
  })
}