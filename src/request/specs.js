import axios from '../utils/http'

// 规格总数量
export function specsTotal() {
    let res = axios.get('/specscount')
    return res
}
//获取规格列表 需要传page 和size
export function getSpecsList(params) {
    let res = axios.get('/specslist', { params: params })

    return res
}
//获取规格总数
export function getAllSpecsList(total) {
    let res = axios.get('/specslist', { params: { page: 1, size: total } })
    return res
}
// 添加规格
export function addSpecs(data) {
    let res = axios.post('/specsadd', data)
    return res
}
// 规格修改
export function editSpecs(data) {
    let res = axios.post('/specsedit', data)
    return res
}

// 规格删除
export function delSpecs(id) {
    let res = axios.post('/specsdelete', { id: id })
    return res
}