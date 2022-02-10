import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import baseUrl from "@/helpers/links/baseUrl";
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload)

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$baseUrl = baseUrl();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
