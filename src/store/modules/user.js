import { getUserList, userTotal } from '../../request/user'

export default {
    namespaced: true,
    state() {
        return {
            //存储管理员列表
            UserList: [],
            userTotal: 0
        }
    },
    mutations: {
        // 获取管理员列表
        userInit(state, data) {
            state.UserList = data
        },
        // 修改管理总数
        setUserTotal(state, data) {
            state.userTotal = data
        }
    },
    actions: {
        //请求管理员列表
        getUserListAction({ commit, dispatch }, params) {
            //通过axios来请求管理员列表  
            getUserList(params).then(res => {
                commit('userInit', res.list)
                dispatch('getUserTotalAction')
            })
        },
        // 请求后台总数
        getUserTotalAction({ commit }) {
            // axios请求后台总数
            userTotal().then(res => {
                commit('setUserTotal', res.list[0].total)
            })
        }
    }
}