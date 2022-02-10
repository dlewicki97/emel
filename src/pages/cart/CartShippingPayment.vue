<template>
  <section class="cart-shipping-payment container">
    <div id="workJS" class="checkout-box">
      <div class="checkout-header p-4">
        <h2 class="text-uppercase font-weight-bold">dane dostawy</h2>
      </div>
      <div v-if="deliveryPrices" class="p-sm-5 p-3">
        <div
          v-for="(delivery, i) in deliveries"
          :key="`delivery-${i}`"
          class="custom-control custom-radio py-2"
        >
          <input
            type="radio"
            class="custom-control-input"
            :id="`delivery-input-${i}`"
            :value="delivery.value"
            v-model="chosenDelivery"
          />
          <label
            class="custom-control-label text-uppercase"
            :for="`delivery-input-${i}`"
          >
            {{ delivery.name }}
          </label>
          <span v-if="deliveryPrices" class="font-weight-bold"
            >{{
              getShippingCost(delivery.code, shippingCountry).toFixed(2)
            }}
            zł</span
          >
        </div>
        <div v-show="chosenDelivery === 'inpost_parcel_locker'">
          <div id="easypack-map"></div>

          <div class="choosed-parcel-locker">
            Wybrany paczkomat: <span>{{ inpostPoint.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="checkout-box">
      <div class="checkout-header p-4">
        <h2 class="text-uppercase font-weight-bold">sposób płatności</h2>
      </div>
      <div class="p-sm-5 p-3">
        <div v-for="(payment, i) in payments" :key="`payment-${i}`">
          <div
            v-if="showPaymentInput(payment.deliveries)"
            class="custom-control custom-radio py-2 align-items-center showPay d-flex"
            style="min-height: unset;"
          >
            <input
              type="radio"
              class="custom-control-input"
              :id="`payment-input-${i}`"
              :value="payment.value"
              v-model="chosenPayment"
            />
            <label
              class="custom-control-label text-uppercase"
              :for="`payment-input-${i}`"
              >{{ payment.name }}</label
            >
            <div v-if="payment.img">
              <img
                v-lazy="`${$baseUrl}/assets/front/${payment.img}`"
                class="img-fluid"
                :alt="`logo płatności ${payment.name}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import alerts from '@/helpers/request/alerts.js';
import statusesKeys from '@/helpers/alertBox/statusesKeys.js';
import getShippingCost from '@/helpers/cart/getShippingCost.js';

export default {
  data() {
    return {
      origin: window.location.origin,
      chosenDelivery: '',
      chosenPayment: '',
      inpostPoint: {
        name: '',
        address: '',
      },
      shippingCountry: JSON.parse(localStorage.getItem('orderData')).shipping
        .country,
    };
  },
  watch: {
    chosenDelivery() {
      this.chosenPayment = '';
      if (this.chosenDelivery == 'inpost_parcel_locker')
        this.initInpostWidget();
    },
  },
  computed: {
    deliveries() {
      let deliveries = this.$store.getters.deliveries;
      let orderData = JSON.parse(localStorage.getItem('orderData'));
      if (orderData.order_type === 1) {
        deliveries = deliveries.filter(
          (delivery) => !['NA'].includes(delivery.code)
        );
      } else if (orderData.order_type === 2) {
        deliveries = deliveries.filter((delivery) =>
          ['SP', 'CP'].includes(delivery.code)
        );
      } else if (orderData.order_type === 3) {
        deliveries = deliveries.filter((delivery) =>
          ['NA'].includes(delivery.code)
        );
      }
      return deliveries.filter(
        (delivery) =>
          this.getShippingCost(delivery.code, this.shippingCountry)
            ?.constructor === Number
      );
    },
    payments() {
      return this.$store.getters.payments;
    },
    deliveryPrices() {
      return this.$store.getters.deliveryPrices;
    },
  },
  methods: {
    getShippingCost,
    showPaymentInput(deliveries) {
      return deliveries.includes(this.chosenDelivery);
    },
    initInpostWidget() {
      let vm = this;
      window.easyPackAsyncInit = function() {
        easyPack.init({});
        var map = easyPack.mapWidget('easypack-map', (point) => {
          vm.inpostPoint.name = point.name;
          vm.inpostPoint.address = Object.values(point.address).join(', ');
        });
      };
    },
    validateForm() {
      let valid = true;
      if (this.chosenDelivery.trim() == '') {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: alerts.cartShippingPaymentNonChoosedDelivery,
        });
        valid = false;
      }
      if (false && this.chosenPayment.trim() == '') {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: alerts.cartShippingPaymentNonChoosedPayment,
        });
        valid = false;
      }

      if (
        this.chosenDelivery.trim() == 'inpost_parcel_locker' &&
        this.inpostPoint.name.trim() == ''
      ) {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: alerts.cartShippingPaymentNonChoosedParcelLocker,
        });
        valid = false;
      }

      return valid;
    },

    saveOrderData() {
      let orderData = JSON.parse(localStorage.getItem('orderData'));
      let delivery = this.deliveries.find(
        (delivery) => delivery.value == this.chosenDelivery
      );

      orderData.delivery = delivery.id;
      orderData.shipping.inpost = {
        point_name: this.inpostPoint.name,
        address: this.inpostPoint.address,
      };
      if (false)
        orderData.paymentId = this.payments.find(
          (payment) => payment.value == this.chosenPayment
        ).id;

      localStorage.setItem('orderData', JSON.stringify(orderData));
    },
  },
  created() {
    this.$store.dispatch('deliveryPrices');
  },
};
</script>

<style scoped>
.choosed-parcel-locker {
  margin-top: 2rem;
  font-weight: 400;
  font-size: 2rem;
}
.choosed-parcel-locker span {
  font-weight: 700;
  font-size: inherit;
}
</style>
