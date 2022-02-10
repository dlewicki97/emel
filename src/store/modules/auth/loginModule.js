import emelAxios from "@/axios/emelAxios.js";
import alerts from "@/helpers/request/alerts";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import router from "@/router/router";

export default {
  actions: {
    login: async ({ commit, getters }, loginData) => {
      await router;

      const stopLoading = () => commit("loading", false);
      const startLoading = () => commit("loading", true);

      startLoading();
      emelAxios
        .post("customer/auth", loginData, {
          headers: {
            "X-Sid": getters.xSid,
          },
        })
        .then((resAuth) => {
          localStorage.setItem("account_uuid", resAuth.data.data.account_uuid);
          emelAxios
            .get(`customer`, {
              headers: {
                "X-Sid": getters.xSid,
                "X-Customer-Id": resAuth.data.data.account_uuid,
              },
            })
            .then((resCustomer) => {
              stopLoading();
              const userData = resCustomer.data.data;
              commit("user", userData);
              commit("alertBox", {
                status: statusesKeys.success,
                message: alerts.loginSuccess,
              });
              router.push({ name: "AccountSettings" });
            })
            .catch((errCustomer) => {
              stopLoading();
            });
        })
        .catch((errAuth) => {
          stopLoading();
          commit("alertBox", {
            status: statusesKeys.error,
            message: errAuth.response.data.error.join(", "),
          });
        });
    },
  },
};
