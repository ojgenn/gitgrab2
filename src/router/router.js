import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import User from '../components/User/User.vue'
import NotFound from '../components/NotFound/NotFound.vue'
import RepoInfo from '../components/RepoInfo/RepoInfo.vue'

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
    },
    {
      path: '/:name/:repo',
      name: 'repo',
      component: RepoInfo,
      props: true
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
