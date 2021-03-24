import axios from '../utils/http'


// 商品总个数
export function goodsTotal() {
    let res = axios.get('/goodscount')
    return res
}

//获取商品分类列表
export function getGoodsList(params) {
    let res = axios.get('/goodslist', { params: params })

    return res
}

// 添加商品
export function addGoods(data) {
    let res = axios.post('/goodsadd', data)
    return res
}
// 修改商品
export function editGoods(data) {
    let res = axios.post('/goodsedit', data)
    return res
}

// 删除商品
export function delGoods(id) {
    let res = axios.post('/goodsdelete', { id: id })
    return res
}