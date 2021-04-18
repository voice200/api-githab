import { getUser } from "@/request";

class User {
  constructor(
    login,
    email,
    avatar,
    linkGithub,
    accessToken,
    id
  ) {
    this.login = login
    this.email = email
    this.avatar = avatar
    this.linkGithub= linkGithub
    this.accessToken = accessToken
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload){
      const {login, id, avatar_url, html_url, email} = payload
      state.user = new User(login, email, avatar_url, html_url, this.state.auth.access_token, id)
    },
    deleteUser(state) {
      state.user = null
    }
  },
  actions: {
    async setUser ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
       const user = await getUser(this.state.auth.access_token)
        commit('setUser', user )
        commit('setLoading', false)
      }
      catch ( e ) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    deleteUser ({commit}) {
      commit('deleteUser')
      commit('setAccessToken', null)
    }
  },
  getters: {
    getUserLocal(state){
      return state.user
    }
  }
}
