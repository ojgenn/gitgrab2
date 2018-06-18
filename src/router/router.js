import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import User from '../components/User/User.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:name',
      name: 'user',
      component: User,
      props: true
    }
  ]
})
