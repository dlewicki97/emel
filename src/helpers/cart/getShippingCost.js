import store from '@/store/store';

export default function getShippingCost(deliveryCode, countryCode) {
  let deliveryPrices = store.getters.deliveryPrices;
  if (!deliveryPrices || deliveryCode === 'NA') return 0;
  return deliveryPrices[countryCode].cost[deliveryCode.toLowerCase()];
}
