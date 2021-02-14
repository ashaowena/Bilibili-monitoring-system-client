import Vuex from 'vuex'
import Vue from 'vue'
import { upVo } from '@/utils/dashboard';

Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
  state: {
    groups: [],

  },
  mutations: {
      // 修改共享数据，需要组件通过'$store.commit('methodName')'调用，不能直接调用！
    updateGroup(state, data) {
      this.state.groups = data
    }
  },
  actions: {
    updateGroupFuture(context,data) {
      context.commit("updateGroup",data)
    }
  },
  getters: {
    getGroups(state) {
      return state.groups
    },
    getUps(state) {
      let Ups = []
      state.groups.forEach(group => {
        group.upVos.forEach(up => {
        Ups.push(new upVo(up,group));
      })});
      return Ups
    }

  }
});



// 导出store
export default store
