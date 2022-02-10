import emelAxios from '@/axios/emelAxios.js';
import setProducts from '../../helpers/products/setProducts';
import router from '@/router/router.js';
import getXSid from '@/helpers/xSid/getXSid';

export default {
  actions: {
    setup: async ({ commit, dispatch }) => {
      await router;

      const keysMethods = [
        { name: 'categories', method: dispatch, json: true },
        { name: 'sizeList', method: commit, json: true },
        { name: 'xSid', method: commit, json: false },
      ];

      for (const key of keysMethods) {
        const localStorageItem = localStorage.getItem(key.name);
        const setup = key.json
          ? JSON.parse(localStorageItem)
          : localStorageItem;
        if (setup) key.method(key.name, setup);
      }

      const xSid = getXSid();
      const setupEndpoint = `setup${xSid ? `/${xSid}` : ''}`;

      await emelAxios
        .get(setupEndpoint, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            Accept: 'application/json',
          },
        })
        .then((res) => {
          const keysValues = [
            { name: 'categories', value: res.data.meta.rootNodes },
            { name: 'sizeList', value: res.data.meta.sizesAvailable },
            { name: 'xSid', value: res.data.meta['x-sid'] },
          ];

          const keysMethodsValues = keysMethods.map((key, i) =>
            Object.assign(key, keysValues[i])
          );

          keysMethodsValues.forEach((key) => {
            key.method(key.name, key.value);
            localStorage.setItem(
              key.name,
              key.json ? JSON.stringify(key.value) : key.value
            );
          });

          if (router.history.current.name == 'Listing') setProducts();
        });
    },
  },
};
