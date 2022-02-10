import axios from "axios";
import baseUrl from "../../helpers/links/baseUrl";

export default {
  state: {
    settings: false,
  },
  getters: {
    settings: (state) => state.settings,
  },
  mutations: {
    settings: (state, settings) => (state.settings = settings),
  },
  actions: {
    settings: async ({ commit }) =>
      await axios
        .get(`${baseUrl()}api/settings/get`)
        .then((res) => commit("settings", res.data)),
  },
};
