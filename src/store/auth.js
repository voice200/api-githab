import { getToken, getUser } from "@/request";

export default {
  state: {
    code: null,
    stateUrl: null,
    stateGenerate: null,
    access_token: null,
    id_token: null
  },
  mutations: {
    setCode(state, payload){
      state.code = payload
    },
    setStateUrl(state, payload){
      state.stateUrl = payload
    },
    stateGenerate(state, payload){
      state.stateGenerate = payload
    },
    setAccessToken(state, payload){
      state.access_token = payload
    },
    setIdToken(state, payload){
      state.id_token = payload
    }
  },
  actions: {
    setCode({commit}, payload) {
      commit('setCode', payload)
    },
    setStateUrl({commit}, payload) {
      commit('setStateUrl', payload)
    },
    stateGenerate({commit}, payload) {
      commit('setStateGenerate', payload)
    },
    setAccessToken({commit}, payload) {
      commit('setAccessToken', payload)
    },
    setIdToken({commit}, payload) {
      commit('setIdToken', payload)
    },
    async loginFromGithub({commit}){
      const stateGenerate = localStorage.getItem('state')
      console.log('this.state.stateUrl', this.state.auth.stateUrl, this.state.auth.code)
      if (this.state.auth.stateUrl && this.state.auth.code){
        if ( stateGenerate === this.state.auth.stateUrl ){
          commit('clearError')
          commit('setLoading', true)
          localStorage.setItem('code_client', this.state.auth.code)
          try {
            const {access_token} = await getToken(this.state.auth.code)
            localStorage.setItem('access_token', access_token)
            commit('setAccessToken', access_token)
            const user = await getUser(this.state.auth.access_token)
            commit('setUser', user )
            commit('setLoading', false)
          }catch ( e ) {
            commit('setLoading', false)
            commit('setError', e.message)
          }
          console.log('все хорошо')
        } else {
          localStorage.removeItem('state')
          commit('setError', 'invalid state, try again later')
        }
      }else {
        console.log('не было попытки входа')
      }
    }
  },
  getters: {
    getCode(state){
      return state.code
    },
    getStateUrl(state){
      return state.stateUrl
    },
    getStateGenerate(state){
      return state.stateGenerate
    },
    getAccessToken(state){
      return state.access_token
    },
    getIdToken(state){
      return state.id_token
    }
  }
}
