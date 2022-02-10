export default {
  state: {
    sizeList: new Set(),
  },
  getters: {
    sizeList: (state) => state.sizeList,
  },
  mutations: {
    sizeList: (state, sizeList) =>
      (state.sizeList =
        sizeList?.constructor == Set ? sizeList : new Set(sizeList)),
  },
};
