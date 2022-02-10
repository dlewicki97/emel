import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import router from "@/router/router";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default async function deleteAccount() {
  if (!confirm("Czy na pewno usunąć konto?")) return;

  await store;
  await router;

  store.commit("loading", true);
  const stopLoading = () => store.commit("loading", false);

  await emelAxios
    .delete(`customer`, {
      headers: {
        "X-Sid": getXSid(),
        "X-Customer-Id": localStorage.getItem("account_uuid"),
      },
    })
    .then((res) => {
      stopLoading();
      store.commit("alertBox", {
        status: statusesKeys.success,
        message: alerts.deleteAccountSuccess,
      });
      store.dispatch("logout");
      router.push({ name: "LoginRegister" });
    })
    .catch((err) => {
      stopLoading();
      store.commit("alertBox", {
        status: statusesKeys.error,
        message: alerts.serverError,
      });
    });
}
