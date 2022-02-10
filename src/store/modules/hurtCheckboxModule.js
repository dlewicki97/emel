export default {
  state: {
    hurtCheckbox: false,
  },
  getters: {
    hurtCheckbox: (state) => state.hurtCheckbox,
  },
  mutations: {
    hurtCheckbox: (state, hurtCheckbox) => (state.hurtCheckbox = hurtCheckbox),
  },
};
