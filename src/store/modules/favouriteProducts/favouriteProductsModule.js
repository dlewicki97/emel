import emelAxios from "@/axios/emelAxios";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default {
  state: {
    favouriteProducts: [],
  },
  getters: {
    favouriteProducts: (state) => state.favouriteProducts,
  },
  mutations: {
    favouriteProducts: (state, favouriteProducts) =>
      (state.favouriteProducts = favouriteProducts),
  },
  actions: {
    favouriteProducts: async ({ commit }) => {
      let localFavouriteProducts =
        JSON.parse(localStorage.getItem("favouriteProducts")) ?? [];
      commit("favouriteProducts", localFavouriteProducts ?? []);

      if (!localStorage.getItem("account_uuid")) return;

      await emelAxios
        .get("/favorite", {
          headers: {
            "X-Sid": getXSid(),
          },
        })
        .then((res) => commit("favouriteProducts", res.data.data.details))
        .catch((err) => {
          commit("alertBox", {
            status: statusesKeys.error,
            message: alerts.favouritesError,
          });
        });
    },
  },
};
