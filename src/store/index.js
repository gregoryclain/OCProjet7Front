/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: null,
    adminRole: null
  },
  mutations: {
    SET_AUTH_USER(state, userObj) {
      state.authUser = userObj;
    },
    CLEAR_AUTH_USER(state) {
      state.authUser = null;
      state.adminRole = null;
    },
    SET_ROLE_USER(state, userObj) {
      state.adminRole = userObj;
    }
  },
  actions: {
    setUserObject: ({ commit }, userObj) => {
      commit("SET_AUTH_USER", userObj);
    },
    clearAuthUser: ({ commit }, userObj) => {
      commit("CLEAR_AUTH_USER");
    },
    setUserRole: ({ commit }, userObj) => {
      // console.log("state.adminRole", userObj);
      commit("SET_ROLE_USER", userObj);
    }
  },
  modules: {}
});
