import emelAxios from "@/axios/emelAxios";
import getXSid from "@/helpers/xSid/getXSid";
import alerts from "@/helpers/request/alerts";
import statusesKeys from "@/helpers/alertBox/statusesKeys";

export default {
  state: {
    userAddresses: [],
  },
  getters: {
    userAddresses: (state) => state.userAddresses,
  },
  mutations: {
    userAddresses: (state, userAddresses) =>
      (state.userAddresses = userAddresses),
  },
  actions: {
    userAddresses: ({ commit }) =>
      emelAxios
        .get("customer/address/all", {
          headers: {
            "X-Sid": getXSid(),
            "X-Customer-Id": localStorage.getItem("account_uuid"),
          },
        })
        .then((res) => {
          commit("userAddresses", res.data.data);
        })
        .catch((err) =>
          commit("alertBox", {
            status: statusesKeys.error,
            message: alerts.userAddressesError,
          })
        ),
  },
};
