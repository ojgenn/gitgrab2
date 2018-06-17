import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'vue-awesome/icons'
import { COLORS } from './assets/js/colors'

import 'vue-awesome/icons'

Vue.config.productionTip = false

Vue.filter('colorize', function (value) {
  if (!value) return 'transparent'
  return COLORS[value].color ? COLORS[value].color : 'transparent'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
