import axios from "axios";
import baseUrl from "../../helpers/links/baseUrl";

export default {
  state: {
    contactSettings: null,
  },
  getters: {
    contactSettings: (state) => state.contactSettings,
  },
  mutations: {
    contactSettings: (state, contactSettings) =>
      (state.contactSettings = contactSettings),
  },
  actions: {
    contactSettings: async ({ commit }) =>
      await axios
        .get(`${baseUrl()}api/contact_settings/get`)
        .then((res) => commit("contactSettings", res.data)),
  },
};
