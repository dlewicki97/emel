import emelAxios from '@/axios/emelAxios';
import store from '@/store/store';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default async function deleteAddress(addressId) {
  if (!confirm('Czy na pewno usunąć ten adres?')) return;
  await store;

  store.commit('loading', true);
  const stopLoading = () => store.commit('loading', false);

  await emelAxios
    .delete(`customer/address/${addressId}`, {
      headers: {
        'X-Sid': getXSid(),
        'X-Customer-Id': localStorage.getItem('account_uuid'),
      },
    })
    .then((res) => {
      stopLoading();
      store.commit('alertBox', {
        status: statusesKeys.success,
        message: alerts.deleteAddressSuccess,
      });
      store.dispatch('userAddresses');
    })
    .catch((err) => {
      stopLoading();
      store.commit('alertBox', {
        status: statusesKeys.error,
        message: alerts.serverError,
      });
    });
}
