export default {
  state: {
    types: [],
  },
  getters: {
    types: (state) => state.types,
  },
  mutations: {
    types: (state, types) => (state.types = types),
  },
};
