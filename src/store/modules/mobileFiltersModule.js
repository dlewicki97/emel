export default {
  state: {
    mobileFilters: false,
  },
  getters: {
    mobileFilters: (state) => state.mobileFilters,
  },
  mutations: {
    mobileFilters: (state, mobileFilters) =>
      (state.mobileFilters = mobileFilters),
  },
};
