import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Forum from "../views/Forum.vue";
import Topic from "../views/Topic.vue";
import TopicNew from "../views/TopicNew.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/forum",
    name: "Forum",
    component: Forum
  },
  {
    path: "/forum/topic/new",
    name: "Forum-message-new",
    component: TopicNew
  },
  {
    path: "/forum/topic/:id",
    name: "Forum-message-detail",
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
  routes
});

export default router;
