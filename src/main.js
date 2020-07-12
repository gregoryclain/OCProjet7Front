import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { api } from "./config/urlsApi";
import VueJwtDecode from "vue-jwt-decode";
import moment from "moment";

Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(VueJwtDecode);
Vue.use(Vuex);

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY HH:mm");
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
