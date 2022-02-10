import emelAxios from "@/axios/emelAxios";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import getXSid from "@/helpers/xSid/getXSid";

export default {
  actions: {
    autoLogin: async ({ commit, dispatch }) => {
      const account_uuid = localStorage.getItem("account_uuid");
      if (!account_uuid) return;

      await emelAxios
        .get("/customer", {
          headers: {
            "X-Sid": getXSid(),
            "X-Customer-Id": account_uuid,
          },
        })
        .then(async (res) => {
          const userData = res.data.data;
          commit("user", userData);
          dispatch("accountSettingsInputs");
        })
        .catch((err) =>
          commit("alertBox", {
            status: statusesKeys.error,
            message: err.response.data.error?.join(", "),
          })
        );
    },
  },
};
