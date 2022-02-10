export default {
  state: {
    listingLoading: false,
  },
  getters: {
    listingLoading: (state) => state.listingLoading,
  },
  mutations: {
    listingLoading: (state, listingLoading) =>
      (state.listingLoading = listingLoading),
  },
};
