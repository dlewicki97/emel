import createAddresses from '@/helpers/accountSettings/createAddresses';
import updateAddresses from '@/helpers/accountSettings/updateAddresses';
import store from '@/store/store';

export default async function saveAddresses(userAddresses) {
  await store;

  let addressesToCreate = userAddresses.filter(
    (address) => !address.customer_address_id
  );
  let addressesToUpdate = userAddresses.filter(
    (address) => address.customer_address_id
  );

  store.commit('loading', true);

  await createAddresses(addressesToCreate);
  await updateAddresses(addressesToUpdate);

  store.commit('loading', false);
}
