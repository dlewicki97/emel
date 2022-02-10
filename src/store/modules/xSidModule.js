export default {
  state: { xSid: "" },
  getters: { xSid: (state) => state.xSid },
  mutations: { xSid: (state, xSid) => (state.xSid = xSid) },
};
