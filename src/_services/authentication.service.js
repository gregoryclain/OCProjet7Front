/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import axios from "axios";
// import { mapState } from "vuex";
import {
  getToken,
  getRoles,
  getPermission,
  hasRole,
  decodeToken
} from "@brickblock/authorisation-library";
import { getHeader } from "@/config";
// ne peut
import store from "../../src/store";
import router from "../../src/router";
import { api } from "@/config/urlsApi";

// import VueJwtDecode from "vue-jwt-decode";

// const URL_API = process.env.VUE_APP_URL;
// const URL_USER = URL_API + "api/users";
// const URL_LOGIN = URL_API + "api/users/login"; // get token user

// var token = null;
var authUser = {};
var currentUser = {};

// ...mapState({
//   userStore: state => state.userStore
// })

function logout() {
  store.dispatch("clearAuthUser");
  window.localStorage.removeItem("authUser");
  router.push("/");
}

function login(credentials) {
  console.log("credentials", credentials);
  let payLoadLogin = credentials;
  axios
    .post(api.USERS_LOGIN, payLoadLogin)
    .then(response => {
      authUser = response.data;
      window.localStorage.setItem("authUser", JSON.stringify(authUser));
      store.dispatch("setUserRole", response.data.user.roles);
      store.dispatch("setUserObject", authUser);
      router.push("/forum");
    })
    .catch(error => {
      alert(error);
      console.log("error = ", error);
    });
}

// function checkRoles() {
//   if (window.localStorage.getItem("authUser")) {
//     let userObj = JSON.parse(window.localStorage.getItem("authUser"));
//     // console.log("userObj", userObj);
//     axios
//       .get(api.URL_USER, { headers: getHeader() })
//       .then(response => {
//         store.dispatch("setUserRole", response.data.user.roles);
//       })
//       .catch(error => {
//         console.log("error");
//         logout();
//       });
//   }
// }

export const authenticationService = {
  logout,
  login
  // checkRoles
  // currentUser: currentUserSubject.asObservable(),
  // get currentUserValue () {
  //   return currentUserSubject.value;
  // }
};
