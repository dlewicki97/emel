import emelAxios from '@/axios/emelAxios';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  state: {
    searchedProducts: [],
  },
  getters: {
    searchedProducts: (state) => state.searchedProducts,
  },
  mutations: {
    searchedProducts: (state, searchedProducts) =>
      (state.searchedProducts = searchedProducts),
  },
  actions: {
    searchedProducts: async ({ commit }, search) => {
      commit('searchedProductsLoading', true);

      await emelAxios
        .post(
          'list/set',
          {
            item: search,
          },
          {
            headers: {
              'X-Sid': getXSid(),
            },
          }
        )
        .then((res) => {
          commit('searchedProductsLoading', false);
          commit('searchedProducts', res.data.data);
        })
        .catch((err) => {
          commit('searchedProductsLoading', false);
          commit('alertBox', {
            status: statusesKeys.error,
            message: alerts.cartError,
          });
        });
    },
  },
};
