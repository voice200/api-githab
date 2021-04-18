import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user:id',
    name: 'User',
    component: () => import('../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
