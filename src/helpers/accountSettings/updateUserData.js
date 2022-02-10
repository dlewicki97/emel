import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";

export default async function updateUserData(userData) {
  await store;

  store.commit("loading", true);
  const stopLoading = () => store.commit("loading", false);

  emelAxios
    .put("customer", userData, {
      headers: {
        "X-Sid": getXSid(),
        "X-Customer-Id": localStorage.getItem("account_uuid"),
      },
    })
    .then((res) => {
      stopLoading();
      store.commit("alertBox", {
        status: statusesKeys.success,
        message: alerts.userDataEditSuccess,
      });
    })
    .catch((err) => {
      stopLoading();
      store.commit("alertBox", {
        status: statusesKeys.error,
        message: alerts.serverError,
      });
    });
}
