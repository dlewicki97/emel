import store from "@/store/store.js";

export default async function setCurrentInputs(inputs) {
  await store;

  store.commit("CurrentInputs/currentInputs", inputs);
}
