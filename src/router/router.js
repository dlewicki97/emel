import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
import store from "@/store/store";

Vue.use(VueRouter);
Vue.config.devtools = true;

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "LoginRegister" && localStorage.getItem("account_uuid"))
    next({ name: "AccountSettings" });
  else next();
});

router.afterEach(async (to, from) => {
  await store;

  store.commit("metaTitle", "");
});

export default router;
