import axios from "axios";
import baseUrl from "../../helpers/links/baseUrl";

export default {
  state: {
    poradnikCategory: [],
  },
  getters: {
    poradnikCategory: (state) => state.poradnikCategory,
  },
  mutations: {
    poradnikCategory: (state, poradnikCategory) =>
      (state.poradnikCategory = poradnikCategory),
  },
  actions: {
    poradnikCategory: async ({ commit }) =>
      await axios
        .get(`${baseUrl()}api/poradnik_category/get`)
        .then((res) => commit("poradnikCategory", res.data)),
  },
};
