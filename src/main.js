import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { api } from "./config/urlsApi";
import VueJwtDecode from "vue-jwt-decode";
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueJwtDecode);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
