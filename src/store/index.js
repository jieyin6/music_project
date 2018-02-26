import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from  './state'
import mutations from './mutations'
//记录修改前修改后的的state
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
//vuex的调试工具
const debug = process.env.NODE_ENV !== 'production'

export const strict = false

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,
    plugin:debug?[createLogger()]:[]
})