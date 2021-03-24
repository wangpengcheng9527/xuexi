import { getGoodsList, goodsTotal } from '../../request/goods'

export default {
    namespaced: true,
    state() {
        return {
            //存储管理员列表
            goodsList: [],
            goodsTotal: 0
        }
    },
    mutations: {
        // 获取管理员列表
        goodsInit(state, data) {
            state.goodsList = data
        },
        // 修改管理总数
        setGoodsTotal(state, data) {
            state.goodsTotal = data
        }
    },
    actions: {
        //请求管理员列表
        getGoodsListAction({ commit, dispatch }, params) {
            //通过axios来请求管理员列表  
            getGoodsList(params).then(res => {
                commit('goodsInit', res.list)
                dispatch('getGoodsTotalAction')
            })
        },
        // 请求后台总数
        getGoodsTotalAction({ commit }) {
            // axios请求后台总数
            goodsTotal().then(res => {
                commit('setGoodsTotal', res.list[0].total)
            })
        }
    }
}