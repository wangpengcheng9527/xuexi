import { getRoleList } from '../../request/role'

export default {
    namespaced: true,
    state() {
        return {
            //存储角色列表
            RoleList: []
        }
    },
    mutations: {
        // 获取角色列表
        roleInit(state, data) {
            state.RoleList = data
        }
    },
    actions: {
        //请求角色列表
        getRoleListAction({ commit }) {
            //通过axios来请求角色列表  
            getRoleList().then(res => {
                commit('roleInit', res.list)
            })
        }
    }
}