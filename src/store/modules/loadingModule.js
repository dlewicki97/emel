export default {
  state: {
    loading: false,
  },
  getters: {
    loading: (state) => state.loading,
  },
  mutations: {
    loading: (state, loading) => (state.loading = loading),
  },
};
