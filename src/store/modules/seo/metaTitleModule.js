export default {
  state: {
    metaTitle: "",
  },
  getters: {
    metaTitle: (state) => state.metaTitle,
  },
  mutations: {
    metaTitle: (state, metaTitle) => (state.metaTitle = metaTitle),
  },
};
