import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/standings",
    name: "Standings",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Standings.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
