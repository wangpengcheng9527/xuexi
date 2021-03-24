import axios from '../utils/http'


//获取列表
export function getRoleList() {
    let res = axios.get('/rolelist')
    console.log(res);
    return res
}

// 添加角色
export function addRole(data) {
    let res = axios.post('/roleadd', data)
    return res
}
// 角色修改
export function editRole(data) {
    let res = axios.post('/roleedit', data)
    return res
}

// 角色删除
export function delRole(id) {
    let res = axios.post('/roledelete', { id: id })
    return res
}