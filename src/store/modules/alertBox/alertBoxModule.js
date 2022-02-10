export default {
  state: {
    alertBox: [],
  },
  getters: {
    alertBox: (state) => state.alertBox,
  },
  mutations: {
    alertBox: (state, alertBox) => {
      if (!alertBox.message) return;
      state.alertBox = [...state.alertBox, alertBox];

      setTimeout(() => {
        const alertIndex = state.alertBox.indexOf(alertBox);
        const newAlertBox = state.alertBox;
        newAlertBox.splice(alertIndex, 1);
        state.alertBox = newAlertBox;
      }, 8000);
    },
    removeAlertBox: (state, index) => state.alertBox.splice(index, 1),
  },
};
