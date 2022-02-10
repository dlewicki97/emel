import router from "@/router/router.js";
import store from "@/store/store.js";

export default async function getProducts() {
  await router;
  await store.dispatch("getProducts", router.history.current.params.page ?? 1);
}
