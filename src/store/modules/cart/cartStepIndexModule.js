export default {
  state: {
    cartStepIndex: 0,
  },
  getters: {
    cartStepIndex: (state) => state.cartStepIndex,
  },
  mutations: {
    cartStepIndex: (state, cartStepIndex) =>
      (state.cartStepIndex = cartStepIndex),
  },
};
