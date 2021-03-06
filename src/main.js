// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import router from './router'
import formatDate from './global/formatDate'
import global from './global/global'

const Vue = require('vue');

Vue.prototype.formatDate = formatDate;
Vue.prototype.global = global;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
