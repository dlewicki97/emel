import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default async function createAddresses(addresses) {
  if (addresses.length === 0) return;
  await store;

  const stopLoading = () => store.commit("loading", false);

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];

    await emelAxios
      .post("customer/address", address, {
        headers: {
          "X-Sid": getXSid(),
          "X-Customer-Id": localStorage.getItem("account_uuid"),
        },
      })
      .then((res) => {
        store.commit("alertBox", {
          status: statusesKeys.success,
          message: alerts.createAddressSuccess,
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

  store.dispatch("userAddresses");
}
