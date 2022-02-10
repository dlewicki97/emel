import emelAxios from '@/axios/emelAxios';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';
import getXCustomerId from '@/helpers/xCustomerId/getXCustomerId';
import store from '@/store/store';
import router from '@/router/router';

export default async function createOrder() {
  await store;

  let orderData = JSON.parse(localStorage.getItem('orderData'));
  delete orderData.paymentId;

  let headers = {
    headers: { 'X-Sid': getXSid() },
  };
  let xCustomerId = getXCustomerId();
  if (xCustomerId) headers.headers['X-Customer-Id'] = xCustomerId;
  store.commit('loading', true);
  await emelAxios
    .post('order', orderData, headers)
    .then((res) => {
      store.commit('alertBox', {
        status: statusesKeys.success,
        message: alerts.createOrderSuccess,
      });
      store.dispatch('cart');
      sessionStorage.removeItem('cartStepIndex');
      localStorage.removeItem('orderData');
      router.push({
        name: 'ThankYou',
        params: { order_uuid: res.data.data.order_uuid },
      });
      store.commit('loading', false);
    })
    .catch((err) => {
      store.commit('alertBox', {
        status: statusesKeys.error,
        message: err.response.message,
      });
      store.commit('loading', false);
    });
}
