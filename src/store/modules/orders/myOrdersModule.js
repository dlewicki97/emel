import emelAxios from "@/axios/emelAxios";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default {
  state: {
    myOrders: [
      {
        id: 1,
        returned: false,
        complainted: false,
      },
      {
        id: 2,
        returned: true,
        complainted: true,
      },
    ],
  },
  getters: {
    myOrders: (state) => state.myOrders,
  },
  mutations: {
    myOrders: (state, myOrders) => (state.myOrders = myOrders),
  },
  actions: {
    myOrders: async ({ commit }) =>
      await emelAxios
        .get("/order", {
          headers: {
            "X-Sid": getXSid(),
          },
        })
        .then((res) => commit("myOrders", res.data.data))
        .catch((err) =>
          commit("alertBox", {
            status: statusesKeys.error,
            message: alerts.cartError,
          })
        ),
  },
};
