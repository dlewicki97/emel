import emelAxios from '@/axios/emelAxios';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  state: {
    deliveryPrices: null,
  },
  getters: {
    deliveryPrices: (state) => state.deliveryPrices,
  },
  mutations: {
    deliveryPrices: (state, deliveryPrices) =>
      (state.deliveryPrices = deliveryPrices),
  },
  actions: {
    deliveryPrices: async ({ commit }) =>
      await emelAxios
        .get('/delivery', {
          headers: {
            'X-Sid': getXSid(),
          },
        })
        .then((res) => commit('deliveryPrices', res.data.data))
        .catch((err) =>
          commit('alertBox', {
            status: statusesKeys.error,
            message: alerts.deliveryPricesError,
          })
        ),
  },
};
