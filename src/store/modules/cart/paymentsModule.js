import emelAxios from '@/axios/emelAxios';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  state: {
    payments: [
      {
        id: 1,
        name: 'Payu',
        img: 'img/payu.png',
        value: 'payu',
        deliveries: ['courier', 'inpost_parcel_locker'],
      },
      {
        id: 2,
        name: 'Przelew tradycyjny',
        value: 'traditional_transfer',
        deliveries: ['courier_prepayment'],
      },
      {
        id: 3,
        name: 'Przy odbiorze',
        value: 'cash_on_delivery',
        deliveries: ['pickup_in_person', 'courier_on_delivery'],
      },
    ],
  },
  getters: {
    payments: (state) => state.payments,
  },
  mutations: {
    payments: (state, payments) => (state.payments = payments),
  },
  actions: {
    payments: async ({ commit }) =>
      await emelAxios
        .get('/payments', {
          headers: {
            'X-Sid': getXSid(),
          },
        })
        .then((res) => commit('payments', res.data.data))
        .catch((err) =>
          commit('alertBox', {
            status: statusesKeys.error,
            message: alerts.paymentsError,
          })
        ),
  },
};
