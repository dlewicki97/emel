import router from "@/router/router.js";
import store from "@/store/store.js";
import defaultCategory from "@/consts/categories/defaultCategory";

export default async function setProducts() {
  await router;
  const sizes = store.getters.filters.sizes;

  await store.dispatch("setProducts", {
    category_id: router.history.current.params.category_id ?? defaultCategory,
    sizes: sizes.size == 0 ? [] : [...sizes],
    type:
      store.getters.filters.type?.id ??
      JSON.parse(localStorage.getItem("type"))?.id ??
      null,
    sex: store.getters.filters.sex?.id ?? 30,
  });
}
