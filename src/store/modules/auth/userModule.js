export default {
  state: {
    user: {},
  },
  getters: {
    user: (state) => state.user,
    isUserWholesale: (state) => Boolean(state.user.status & 8),
  },
  mutations: {
    user: (state, user) => (state.user = user),
  },
};
