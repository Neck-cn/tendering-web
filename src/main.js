// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import formatDate from './js/formatDate'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.prototype.$qs = qs;
Vue.prototype.formatDate = formatDate;
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
