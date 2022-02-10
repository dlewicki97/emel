export default {
  getters: {
    inputsValidation: (state, getters) =>
      getters["CurrentInputs/currentInputs"].every((input) => input.valid),
  },
};
