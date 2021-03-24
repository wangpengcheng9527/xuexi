import { getSpecsList, specsTotal, getAllSpecsList } from '../../request/specs'

export default {
    namespaced: true,
    state() {
        return {
            //存储规格列表
            SpecsList: [],
            SpecsTotal: 0,
            specsAllList: []
        }
    },
    mutations: {
        // 获取规格列表
        specsInit(state, data) {
            state.SpecsList = data
        },
        // 修改规格数
        setSpecsTotal(state, data) {
            state.SpecsTotal = data
        },
        // 规格总数列表
        specsAllList(state, data) {
            state.specsAllList = data
        }
    },
    actions: {
        //请求规格列表
        getSpecsListAction({ commit, dispatch }, params) {
            //通过axios来请求管规格列表  
            getSpecsList(params).then(res => {
                commit('specsInit', res.list)
                dispatch('getSpecsTotalAction')
            })
        },
        // 请求后台总数
        getSpecsTotalAction({ commit }) {
            // axios请求后台总数
            specsTotal().then(res => {
                commit('setSpecsTotal', res.list[0].total)
                    // 向后台请求规格总数列表
                getAllSpecsList(res.list[0].total).then(res => {
                    commit('specsAllList', res.list)
                })
            })
        }
    }
}