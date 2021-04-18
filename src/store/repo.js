import { getBranches, getRepo} from "@/request";
export default {
  state : {
    search: {
      dateStart: null,
      dateEnd: null,
      repo: null,
      owner: null,
      branch: 'master'
    },
    branches: [],
    commits: [],
    repository: {},
    pullRequests: {
      active: [],
      done: [],
    }
  },
  mutations: {
    setSearch (state, payload) {
      console.log('payload', payload)
      state.search = {...state.search, ...payload}
      console.log('state.search', state.search)
    },
    setBranches(state, payload){
      state.branches = payload
    },
    setRepository(state, payload) {
      state.repository = payload
    }
  },
  actions: {
    setSearch ({commit}, payload) {
      commit('setSearch', payload)
    },
    async setBranches ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const {owner, repo} = this.state.repo.search
      const {accessToken: token} = this.state.user.user
       try {
         const branches = await getBranches(owner, repo, token)
         commit('setBranches', branches)
         commit('setLoading', false)
       }
       catch ( e ) {
         commit('setLoading', false)
         commit('setError', e.message)
       }
    },
    async setRepository ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const {owner, repo} = this.state.repo.search
      const {accessToken: token} = this.state.user.user
      try {
        const repository = await getRepo(owner, repo, token)
        commit('setRepository', repository)
        commit('setLoading', false)
      }
      catch ( e ) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    }


  },
  getters: {
    getBranches (state){
      return state.branches
    }

  }
}
