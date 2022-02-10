import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default async function cartPost(data) {
  await store;

  const stopLoading = () => store.commit("loading", false);

  await emelAxios
    .post("basket", data, {
      headers: {
        "X-Sid": getXSid(),
      },
    })
    .then(async (res) => {
      stopLoading();
      let messsageKey = "";

      let currentProduct = store.getters.cart.details.find(
        (product) => product.id === data.id
      );

      if (data.qty == 0) messsageKey = "cartDeleteSuccess";
      else if (currentProduct?.qty != data.qty) messsageKey = "cartEditSuccess";
      if (!currentProduct) messsageKey = "cartAddSuccess";

      await emelAxios
        .get("basket", {
          headers: {
            "X-Sid": getXSid(),
          },
        })
        .then((getRes) => {
          store.commit("cart", getRes.data.data);

          store.commit("alertBox", {
            status: statusesKeys.success,
            message: alerts[messsageKey],
          });
        })
        .catch((getErr) => {
          console.log(getErr);
          store.commit("alertBox", {
            status: statusesKeys.error,
            message: alerts.serverError,
          });
        });
    })
    .catch((err) => {
      stopLoading();
      console.log(err);
      store.commit("alertBox", {
        status: statusesKeys.error,
        message: alerts.serverError,
      });
    });
}
