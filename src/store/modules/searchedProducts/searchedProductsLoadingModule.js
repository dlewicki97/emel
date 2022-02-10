export default {
  state: {
    searchedProductsLoading: false,
  },
  getters: {
    searchedProductsLoading: (state) => state.searchedProductsLoading,
  },
  mutations: {
    searchedProductsLoading: (state, searchedProductsLoading) =>
      (state.searchedProductsLoading = searchedProductsLoading),
  },
};
