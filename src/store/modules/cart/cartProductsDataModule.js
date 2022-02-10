export default {
  state: {
    cartProductsData: [],
  },
  getters: {
    cartProductsData: (state) => state.cartProductsData,
  },
  mutations: {
    cartProductsData: (state, cartProductsData) =>
      (state.cartProductsData = cartProductsData),
  },
};
