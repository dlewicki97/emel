export default {
  state: {
    filters: {
      sizes: new Set(),
      type: null,
      sex: null,
    },
  },
  getters: {
    filters: (state) => state.filters,
    sizes: (state) => state.filters.sizes,
    type: (state) => state.filters.type,
    sex: (state) => state.filters.sex,
  },
  mutations: {
    filters: (state, filters) => (state.filters = filters),
    sizes: (state, sizes) => (state.filters.sizes = sizes),
    type: (state, type) => (state.filters.type = type),
    sex: (state, sex) => (state.filters.sex = sex),
  },
};
