import emelAxios from '@/axios/emelAxios';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  state: {
    deliveries: [
      {
        id: 1,
        name: 'Odbiór osobisty',
        price: 0,
        value: 'pickup_in_person',
        code: 'SP',
        payment: '-',
      },
      {
        id: 2,
        name: 'Kurier',
        price: 16,
        value: 'courier',
        code: 'CO',
        payment: 'PayU',
      },
      {
        id: 3,
        name: 'Kurier przedpłata/przelew',
        price: 16,
        value: 'courier_prepayment',
        code: 'CP',
        payment: 'Przelew przedpłata',
      },
      {
        id: 4,
        name: 'Kurier za pobraniem',
        price: 19,
        value: 'courier_on_delivery',
        code: 'CD',
        payment: 'Płatność za pobraniem',
      },
      {
        id: 5,
        name: 'Inpost paczkomaty',
        price: 12,
        value: 'inpost_parcel_locker',
        code: 'IO',
        payment: 'PayU',
      },
      {
        id: 6,
        name: 'Nie dotyczy',
        price: 0,
        value: 'not_applicable',
        code: 'NA',
        payment: 'Nie dotyczy',
      },
    ],
  },
  getters: {
    deliveries: (state) => state.deliveries,
  },
  mutations: {
    deliveries: (state, deliveries) => (state.deliveries = deliveries),
  },
  actions: {
    deliveries: async ({ commit }) =>
      await emelAxios
        .get('/deliveries', {
          headers: {
            'X-Sid': getXSid(),
          },
        })
        .then((res) => commit('deliveries', res.data.data))
        .catch((err) =>
          commit('alertBox', {
            status: statusesKeys.error,
            message: alerts.deliveriesError,
          })
        ),
  },
};
