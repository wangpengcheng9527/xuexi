import { getMenuList } from '../../request/menu'

export default {
    namespaced: true,
    state() {
        return {
            //存储菜单列表
            menuList: []
        }
    },
    mutations: {
        // 获取菜单列表
        menuInit(state, data) {
            state.menuList = data
        }
    },
    actions: {
        //请求菜单
        getMenuListAction({ commit }) {
            //通过axios来获取列表
            getMenuList().then(res => {
                commit('menuInit', res.list)

            })
        }
    }
}