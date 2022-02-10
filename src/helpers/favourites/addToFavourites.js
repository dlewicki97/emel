import emelAxios from "@/axios/emelAxios";
import store from "@/store/store";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import alerts from "@/helpers/request/alerts";
import getXSid from "@/helpers/xSid/getXSid";

export default async function addToFavourites(product) {
  await store;

  let localFavouriteProducts =
    JSON.parse(localStorage.getItem("favouriteProducts")) ?? [];
  if (!localFavouriteProducts.find((fav) => fav.id == product.id))
    localFavouriteProducts.push({
      id: product.id,
      name: product.name,
      gfx: product.gfx,
    });
  localStorage.setItem(
    "favouriteProducts",
    JSON.stringify(localFavouriteProducts)
  );

  store.commit("favouriteProducts", localFavouriteProducts);

  store.commit("alertBox", {
    status: statusesKeys.success,
    message: alerts.addToFavouritesSuccess,
  });

  if (!localStorage.getItem("account_uuid")) return;

  const stopLoading = () => store.commit("loading", false);

  await emelAxios
    .post(
      "favorite",
      {
        id: product.id,
      },
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
