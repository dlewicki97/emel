import emelAxios from '@/axios/emelAxios';
import store from '@/store/store';
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import alerts from '@/helpers/request/alerts';
import getXSid from '@/helpers/xSid/getXSid';

export default async function updateAddresses(addresses) {
  if (addresses.length === 0) return;
  await store;

  const stopLoading = () => store.commit('loading', false);

  addresses.forEach(async (address) => {
    const addressId = address.customer_address_id;

    await emelAxios
      .put(`customer/address/${addressId}`, address, {
        headers: {
          'X-Sid': getXSid(),
          'X-Customer-Id': localStorage.getItem('account_uuid'),
        },
      })
      .then((res) => {
        store.commit('alertBox', {
          status: statusesKeys.success,
          message: alerts.updateAddressSuccess,
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
  });
}
