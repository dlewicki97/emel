export default {
  namespaced: true,
  state: {
    sessionStorageKeys: [
      {
        key: "categories",
        method: "dispatch",
      },
      {
        key: "types",
        method: "commit",
      },
      {
        key: "sizeList",
        method: "commit",
      },
      {
        key: "products",
        method: "commit",
      },
      {
        key: "listingMeta",
        method: "commit",
      },
    ],
  },
  getters: {
    sessionStorageKeys: (state) => state.sessionStorageKeys,
  },
  mutations: {
    sessionStorageKeys: (state, sessionStorageKeys) =>
      (state.sessionStorageKeys = sessionStorageKeys),
  },
};
