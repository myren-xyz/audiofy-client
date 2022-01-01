import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import App from './App.vue'
import router from './router'
import './plugins/eventBus'

Vue.use(Vuex)

Vue.config.ignoredElements = [/^ion-/]
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
