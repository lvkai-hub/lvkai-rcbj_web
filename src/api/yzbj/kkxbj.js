import request from '@/utils/request'

// 查询可靠性报价列表
export function listKkxbj(query) {
  return request({
    url: '/yzbj/kkxbj/list',
    method: 'get',
    params: query
  })
}

// 查询可靠性报价详细
export function getKkxbj(nbxh) {
  return request({
    url: '/yzbj/kkxbj/' + nbxh,
    method: 'get'
  })
}

// 新增可靠性报价
export function addKkxbj(data) {
  return request({
    url: '/yzbj/kkxbj',
    method: 'post',
    data: data
  })
}

// 修改可靠性报价
export function updateKkxbj(data) {
  return request({
    url: '/yzbj/kkxbj',
    method: 'put',
    data: data
  })
}

// 删除可靠性报价
export function delKkxbj(nbxh) {
  return request({
    url: '/yzbj/kkxbj/' + nbxh,
    method: 'delete'
  })
}

// 根据项目内部序号获取可靠性报价信息
export function getKkxbjByXmnbxh(xmnbxh) {
  return request({
    url: '/yzbj/kkxbj/getKkxbjByXmnbxh/' + xmnbxh,
    method: 'get'
  })
}
