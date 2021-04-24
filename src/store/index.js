import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import common from '@/store/common'
import user from '@/store/user'
import repo from '@/store/repo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    auth,
    user,
    repo
  }
})
