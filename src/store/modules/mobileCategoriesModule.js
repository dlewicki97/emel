export default {
  state: {
    mobileCategories: false,
  },
  getters: {
    mobileCategories: (state) => state.mobileCategories,
  },
  mutations: {
    mobileCategories: (state, mobileCategories) =>
      (state.mobileCategories = mobileCategories),
  },
};
