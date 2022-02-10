export default {
  namespaced: true,
  state: {
    dropdowns: {
      sizes: false,
      type: false,
      sex: false,
    },
  },
  getters: {
    dropdowns: (state) => state.dropdowns,
  },
  mutations: {
    dropdowns: (state, dropdowns) => (state.dropdowns = dropdowns),
    sizes: (state, sizes) => (state.dropdowns.sizes = sizes),
    type: (state, type) => (state.dropdowns.type = type),
    sex: (state, sex) => (state.dropdowns.sex = sex),
  },
};
