import { getCateList } from '../../request/cate'

export default {
    namespaced: true,
    state() {
        return {
            //存储菜单列表
            cateList: []
        }
    },
    mutations: {
        // 获取菜单列表
        cateInit(state, data) {
            state.cateList = data
        }
    },
    actions: {
        //请求菜单
        getCateListAction({ commit }) {
            //通过axios来获取列表
            getCateList().then(res => {
                commit('cateInit', res.list)

            })
        }
    }
}