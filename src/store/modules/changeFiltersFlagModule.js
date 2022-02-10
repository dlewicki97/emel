export default {
  state: {
    changeFiltersFlag: false,
  },
  getters: {
    changeFiltersFlag: (state) => state.changeFiltersFlag,
  },
  mutations: {
    changeFiltersFlag: (state, changeFiltersFlag) =>
      (state.changeFiltersFlag = changeFiltersFlag),
  },
};
