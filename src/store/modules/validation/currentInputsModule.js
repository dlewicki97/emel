export default {
  namespaced: true,
  state: {
    currentInputs: [],
  },
  getters: {
    currentInputs: (state) => state.currentInputs,
  },
  mutations: {
    currentInputs: (state, currentInputs) =>
      (state.currentInputs = currentInputs),
  },
};
