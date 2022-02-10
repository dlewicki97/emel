import emelAxios from '@/axios/emelAxios';
import router from '@/router/router.js';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  state: {
    products: [],
    listingMeta: {},
  },
  getters: {
    products: (state) => state.products,
    listingMeta: (state) => state.listingMeta,
  },
  mutations: {
    products: (state, products) => (state.products = products),
    listingMeta: (state, listingMeta) => (state.listingMeta = listingMeta),
  },
  actions: {
    setProducts: async ({ getters, commit, dispatch }, data) => {
      await router;
      let search = false ?? localStorage.getItem('search');

      const payload = Boolean(search)
        ? { item: search }
        : {
            sex: data.sex,
            size: data.sizes,
            node: data.type ?? data.category_id,
          };

      commit('listingLoading', true);

      emelAxios
        .get('setup', {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
          },
        })
        .then((setupRes) => {
          emelAxios
            .post('list/set', payload, {
              headers: {
                'X-Sid': setupRes.data.meta['x-sid'],
              },
            })
            .then((res) => {
              res = res.data;
              const products = Object.values(res.data);
              const types = Object.values(res.includes.subNodes);
              const listingMeta = res.meta;

              commit('products', products);
              commit('listingMeta', listingMeta);
              commit('types', types ?? []);
              commit('listingLoading', false);
            })
            .catch((err) => {
              console.error(err);
              console.log(err);
              commit('listingLoading', false);
            });
        });
    },
    getProducts: ({ commit, getters }, page) => {
      commit('listingLoading', true);
      emelAxios
        .get(`list/get/${page}`, {
          headers: {
            'X-Sid': getters.xSid,
          },
        })
        .then((res) => {
          res = res.data;
          const products = Object.values(res.data);
          const listingMeta = res.meta;

          commit('products', products);
          commit('listingMeta', listingMeta);

          sessionStorage.setItem('products', JSON.stringify(products));
          sessionStorage.setItem('listingMeta', JSON.stringify(listingMeta));

          commit('listingLoading', false);
        })
        .catch((err) => {
          commit('listingLoading', false);
          console.error(err);
          console.log(err);
        });
    },
  },
};
