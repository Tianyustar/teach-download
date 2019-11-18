import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 404page
  {
    path: "/404", name: 'page404', component: () => import("../views/404.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),

    children: [
      {
        path: "/home",
        redirect: '/',
      },
      {
        path: "/content/:index",
        component: () => import("../components/Content.vue"),
      },
    ]
  },
  {
    path: "*", // 页面不存在的情况下会跳到404页面
    redirect: "/404",
    name: "notFound",
    hidden: true
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
