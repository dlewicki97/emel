import axios from "axios";
import baseUrl from "@/helpers/links/baseUrl";

export default {
  state: {
    session: false,
  },
  getters: {
    session: (state) => state.session,
  },
  mutations: {
    session: (state, session) => (state.session = session),
  },
  actions: {
    session: async ({ commit }) =>
      await axios
        .get(`${baseUrl()}api/session/get`)
        .then((res) => commit("session", res.data)),
  },
};
