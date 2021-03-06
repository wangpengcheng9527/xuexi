import axios from '../utils/http'


//获取商品分类列表
export function getCateList() {
    let res = axios.get('/catelist?istree=1')

    return res
}

// 添加商品
export function addCate(data) {
    let res = axios.post('/cateadd', data)
    return res
}
// 修改商品
export function editCate(data) {
    let res = axios.post('/cateedit', data)
    return res
}

// 删除商品
export function delCate(id) {
    let res = axios.post('/catedelete', { id: id })
    return res
}