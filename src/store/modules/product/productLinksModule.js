import axios from "axios";
import baseUrl from "@/helpers/links/baseUrl";

export default {
  state: {
    productLinks: false,
  },
  getters: {
    productLinks: (state) => state.productLinks,
  },
  mutations: {
    productLinks: (state, productLinks) => (state.productLinks = productLinks),
  },
  actions: {
    productLinks: async ({ commit }) =>
      await axios
        .get(`${baseUrl()}api/product_links/get_all`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => commit("productLinks", res.data)),
  },
};
