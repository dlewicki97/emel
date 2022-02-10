import emelAxios from "@/axios/emelAxios";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default {
  state: {
    cart: [],
  },
  getters: {
    cart: (state) => state.cart,
  },
  mutations: {
    cart: (state, cart) => (state.cart = cart),
  },
  actions: {
    cart: async ({ commit }) =>
      await emelAxios
        .get("/basket", {
          headers: {
            "X-Sid": getXSid(),
          },
        })
        .then((res) => commit("cart", res.data.data))
        .catch((err) =>
          commit("alertBox", {
            status: statusesKeys.error,
            message: alerts.cartError,
          })
        ),
  },
};
