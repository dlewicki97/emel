import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default async function removeFromFavourites(product) {
  await store;

  let localFavouriteProducts =
    JSON.parse(localStorage.getItem("favouriteProducts")) ?? [];
  localFavouriteProducts.splice(
    localFavouriteProducts.findIndex((fav) => fav.id == product.id),
    1
  );
  localStorage.setItem(
    "favouriteProducts",
    JSON.stringify(localFavouriteProducts)
  );

  store.commit("favouriteProducts", localFavouriteProducts);
  store.commit("alertBox", {
    status: statusesKeys.success,
    message: alerts.removeFromFavouritesSuccess,
  });

  if (!localStorage.getItem("account_uuid")) return;
  const stopLoading = () => store.commit("loading", false);

  await emelAxios
    .delete(
      `favorite/${product.id}`,

      {
        headers: {
          "X-Sid": getXSid(),
        },
      }
    )
    .then((res) => {
      stopLoading();
      store.commit("favouriteProducts", res.data.data.details);
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
