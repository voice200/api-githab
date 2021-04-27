import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    if (localStorage.getItem('access_token')) {
      this.$store
        .dispatch('setAccessToken', localStorage.getItem('access_token'))
        .then(() => {
          this.$store.dispatch('setUser').then(() => {
            const user = this.$store.getters.getUserLocal
            if (this.$route.name === 'Home') {
              this.$router.push(`/user/${user?.id}`)
            }
          })
        })
    }
  },
  render: (h) => h(App)
}).$mount('#app')
