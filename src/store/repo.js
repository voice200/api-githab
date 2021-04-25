import { getBranches, getPulls, getRepo, getCommits } from "@/request";
import { formatDate } from '@/utils/utils'
export default {
  state: {
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
      closed: [],
      old:[]
    }
  },
  mutations: {
    setSearch(state, payload) {
      console.log('payload', payload)
      state.search = { ...state.search, ...payload }
      console.log('state.search', state.search)
    },
    setBranches(state, payload) {
      state.branches = payload
    },
    setRepository(state, payload) {
      state.repository = payload
    },
    setPullsActive(state, payload) {
      state.pullRequests.active = payload
      console.log('pulls', payload)
    },
    setPullsClosed(state, payload) {
      state.pullRequests.closed = payload
      console.log('pulls', payload)
    },
    setPullsOld(state, payload) {
      state.pullRequests.old = payload
      console.log('pullsOld', payload)
    },
    setCommits(state, payload) {
      state.commits = payload
      console.log('commits', payload)
    }
  },
  actions: {
    setSearch({ commit }, payload) {
      commit('setSearch', payload)
    },
    async setBranches({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const { owner, repo } = this.state.repo.search
      const { accessToken: token } = this.state.user.user
      try {
        const branches = await getBranches(owner, repo, token)
        commit('setBranches', branches)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async setRepository({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const { owner, repo } = this.state.repo.search
      const { accessToken: token } = this.state.user.user
      try {
        const repository = await getRepo(owner, repo, token)
        console.log('repository', repository)
        commit('setRepository', repository)
        commit('setLoading', false)
        commit('setSearch', {
          dateStart: formatDate(repository.created_at),
          dateEnd: formatDate()
        })
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async setCommits({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const { owner, repo, branch } = this.state.repo.search
      const { accessToken: token } = this.state.user.user
      try {
        const commits = await getCommits(owner, repo, token, branch)
        commit('setCommits', commits)
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    },
    async setPulls({commit}) {
      commit('clearError')
      commit('setLoading', true)
      const { owner, repo, branch } = this.state.repo.search
      const { accessToken: token } = this.state.user.user
      try {
        const pulls = await getPulls(owner, repo, token)
        commit('setPullsActive', pulls.filter(item => (
          item.head.ref === branch &&
          item.state === 'open' &&
          new Date(item.created_at) >= new Date(this.state.repo.search.dateStart) &&
          new Date(item.created_at) <= new Date(this.state.repo.search.dateEnd))))
        commit('setPullsClosed', pulls.filter(item => (
          item.head.ref === branch &&
          item.state === 'closed' &&
          new Date(item.created_at) >= new Date(this.state.repo.search.dateStart) &&
          new Date(item.created_at) <= new Date(this.state.repo.search.dateEnd))))
        commit('setPullsOld', this.state.repo.pullRequests.active.filter(item =>
          ((new Date() - new Date(item.created_at))/8.64e+7) >=30))
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
        commit('setError', e.message)
      }
    }
  },
  getters: {
    getBranches(state) {
      return state.branches
    },
    getSearch(state) {
      return state.search
    },
    getActivePR(state) {
      return state.pullRequests.active
    },
    getClosedPR(state) {
      return state.pullRequests.closed
    },
    getOldPR(state) {
      return state.pullRequests.old
    },
    getCommits(state) {
      return state.commits
    }
  }
}
