<template>
  <section class="cart">
    <CartNavigation />
    <div class="container mb-4">
      <router-link to="/sklep">
        <button class="custom-btn checkout-btn  d-block">
          <span><i class="fas fa-angle-left pr-2"></i>Kontynuuj zakupy</span>
        </button>
      </router-link>
    </div>
    <component ref="stepComponent" :is="cartSteps[cartStepIndex]"></component>
    <div class="mt-3 d-flex justify-content-end shipping-info my-3 container">
      <button
        v-if="cartStepIndex > 0"
        @click.prevent="goBack"
        class="custom-btn checkout-btn mr-sm-5 my-sm-0"
      >
        <span><i class="fas fa-angle-left pr-2"></i>Wróć</span>
      </button>
      <button
        id="submitFormBtn"
        class="custom-btn checkout-btn"
        @click.prevent="cartStepIndex == 3 ? pay() : nextStep()"
      >
        <span
          >{{ cartStepIndex == 3 ? 'Zamawiam i płacę' : 'Dalej'
          }}<i class="fas fa-angle-right pl-2"></i
        ></span>
      </button>
    </div>
  </section>
</template>

<script>
import CartProducts from '@/pages/cart/CartProducts';
import CartUserData from '@/pages/cart/CartUserData';
import CartShippingPayment from '@/pages/cart/CartShippingPayment';
import CartSummary from '@/pages/cart/CartSummary';
import CartNavigation from '@/pages/cart/CartNavigation';
import emelAxios from '@/axios/emelAxios';
import getXSid from '@/helpers/xSid/getXSid';
import alerts from '@/helpers/request/alerts.js';
import statusesKeys from '@/helpers/alertBox/statusesKeys.js';
import createOrder from '@/helpers/orders/createOrder.js';

export default {
  components: {
    CartNavigation,
  },
  data() {
    return {
      cartSteps: [CartProducts, CartUserData, CartShippingPayment, CartSummary],
    };
  },
  watch: {
    cartStepIndex() {
      sessionStorage.setItem('cartStepIndex', this.cartStepIndex);
    },
    cart: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.details !== undefined) {
          this.getProducts(newValue.details);
          if (newValue.details?.length != oldValue.details?.length)
            this.getProducts(newValue.details);
        }
      },
    },
  },
  computed: {
    cartStepIndex() {
      return this.$store.getters.cartStepIndex;
    },
    cart() {
      return this.$store.getters.cart;
    },
  },
  methods: {
    goBack() {
      this.$store.commit('cartStepIndex', this.cartStepIndex - 1);
    },
    nextStep() {
      if (!this.validateForm()) {
        return;
      }
      this.$store.commit('cartStepIndex', this.cartStepIndex + 1);
    },
    validateForm() {
      let valid = true;
      const { stepComponent } = this.$refs;

      switch (this.cartStepIndex) {
        case 1:
          if (!stepComponent.formValidate()) valid = false;
          if (stepComponent.addressId == -1) {
            valid = false;
            this.$store.commit('alertBox', {
              status: statusesKeys.error,
              message: alerts.cartUserDataNoAddress,
            });
          }

          if (stepComponent.otherAddress) {
            if (stepComponent.otherAddressId == -1) {
              valid = false;
              this.$store.commit('alertBox', {
                status: statusesKeys.error,
                message: alerts.cartUserDataNoOtherAddress,
              });
            }

            if (stepComponent.otherAddressId === stepComponent.addressId) {
              valid = false;
              this.$store.commit('alertBox', {
                status: statusesKeys.error,
                message: alerts.cartUserDataSameOtherAddressError,
              });
            }
          }

          if (valid) {
            stepComponent.saveOrderData();
          }
          break;

        case 2:
          valid = stepComponent.validateForm();
          if (valid) stepComponent.saveOrderData();
          break;
      }
      return valid;
    },
    async getProducts(cartProducts) {
      let cartProductsData = [];
      for (let i = 0; i < cartProducts.length; i++) {
        if (cartProductsData.find((prod) => prod.data.id == cartProducts[i].id))
          continue;

        await emelAxios
          .get(`item/get/${cartProducts[i].id}`, {
            headers: {
              'X-Sid': getXSid(),
            },
          })
          .then((res) => {
            let productFetched = cartProductsData.find(
              (prod) => prod.data.id == res.data.data.id
            );
            if (!productFetched) cartProductsData.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      this.$store.commit('cartProductsData', cartProductsData);
    },
    pay() {
      const { stepComponent } = this.$refs;
      if (!stepComponent.regulations) {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: alerts.cartSummaryRegulations,
        });
        return;
      }

      createOrder();
    },
  },

  async created() {
    this.$store.commit(
      'cartStepIndex',
      +sessionStorage.getItem('cartStepIndex') ?? 0
    );
    await this.$store.dispatch('cart');
  },
  beforeDestroy() {
    localStorage.removeItem('dpdPoint');
  },
};
</script>

<style scoped>
.cart {
  padding-top: 100px;
}
</style>
