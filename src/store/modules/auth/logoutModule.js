import router from '@/router/router';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';

export default {
  actions: {
    logout: async ({ commit }) => {
      await router;

      commit('user', {});
      localStorage.removeItem('account_uuid');
      localStorage.removeItem('orderData');
      sessionStorage.removeItem('cartStepIndex');
      commit('alertBox', {
        status: statusesKeys.success,
        message: alerts.logoutSuccess,
      });
      commit('userAddresses', []);
      router.push({ name: 'LoginRegister' });
    },
  },
};
