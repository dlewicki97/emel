import findCategory from "../../helpers/categories/findCategory";
import router from "@/router/router.js";
import defaultCategory from "@/consts/categories/defaultCategory";

export default {
  state: {
    category: {},
    categories: [],
  },
  getters: {
    category: (state) => state.category,
    categories: (state) => state.categories,
  },
  mutations: {
    category: (state, category) => (state.category = category),
    categories: (state, categories) => (state.categories = categories),
  },
  actions: {
    categories: async ({ commit }, categories) => {
      await router;
      commit("categories", categories);
      const category = findCategory(
        categories,
        router.history.current.params.category_id ?? defaultCategory
      );
      commit("category", category);
      if (router.history.current.name == "Listing" && category.name)
        commit("metaTitle", category.name);
    },
  },
};
