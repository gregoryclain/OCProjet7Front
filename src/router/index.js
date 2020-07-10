import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Forum from "../views/Forum.vue";
import Topic from "../views/Topic.vue";
import TopicNew from "../views/TopicNew.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/forum",
    name: "Forum",
    meta: { requiresAuth: true },
    component: Forum
  },
  {
    path: "/forum/topic/new",
    name: "Forum-message-new",
    meta: { requiresAuth: true },
    component: TopicNew
  },
  {
    path: "/forum/topic/edit/:id",
    name: "Forum-message-new",
    meta: { requiresAuth: true },
    component: TopicNew
  },

  {
    path: "/forum/topic/:id",
    name: "Forum-message-detail",
    meta: { requiresAuth: true },
    component: Topic
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // if (!to.matched.length) {
  //   next("/404");
  // } else {
  //   next();
  // }

  // controle si admin est authentifié
  // todo vérif role / permission
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem("authUser"));
    if (authUser && authUser.token) {
      next();
    } else {
      next({ name: "Login" });
    }
  }
  next();
});

Vue.use(VueRouter);

export default router;
