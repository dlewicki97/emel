<template>
  <section v-if="orderData" class="cart-summary container">
    <router-link to="/sklep" class="mb-3 d-block">
      <button class="custom-btn checkout-btn  d-block">
        <span><i class="fas fa-angle-left pr-2"></i>Kontynuuj zakupy</span>
      </button>
    </router-link>
    <div class="checkout-box">
      <div class="checkout-header p-4">
        <h2 class="text-uppercase font-weight-bold">
          Dziękujemy za złożenie zamówienia
        </h2>
      </div>
      <div class="checkout-content pt-xl-5 pt-2 pl-xl-5 pl-2 pr-xl-5 pr-2">
        <div class="text-center pb-5">
          <div class="row justify-content-between">
            <div class="col-12 text-uppercase">
              <div class="text-center mx-auto ">
                dane do przelewu tradycyjnego:
              </div>
            </div>
          </div>
          <div class="row justify-content-between py-2">
            <div class="col-12 text-uppercase">
              <div v-if="orderData" class="text-center mx-auto">
                Prosimy o wpłatę kwoty:
                {{
                  priceFormat(
                    orderData.order_summary.basket_value + deliveryCost
                  )
                }}
                PLN<br />
                na numer konta:<br /><strong class="sum-price"
                  >29 1090 2066 0000 0001 3007 0745</strong
                ><br />
                do tytułu przelewu prosimy wpisać:<br /><strong
                  class="sum-price"
                  >{{ orderData.order_number }}</strong
                ><br />
                Zamówienie zostanie zrealizowane, po zaksięgowaniu wpłaty.
              </div>
            </div>
          </div>
        </div>

        <div
          v-for="product in orderData.order_composition"
          :key="`product-cart-summary-${product.item_id}`"
          class="d-flex content-column justify-content-between py-5 border-md-top border-bottom"
        >
          <div class="text-center">
            <router-link
              :to="{
                name: 'Product',
                params: {
                  product_id: product.id,
                  product_name: product.name,
                  category_name: 'roczki',
                },
              }"
            >
              <img
                v-lazy="
                  `https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`
                "
                class="img-fluid"
                alt=""
                width="124"
              />
            </router-link>
          </div>
          <div class="d-flex flex-column">
            <p class="model">{{ product.name }}</p>
            <p class="text-uppercase font-weight-bold">{{ product.name }}</p>
            <p>
              <span class="font-weight-bold">Rozmiar:</span> {{ product.size }}
            </p>
          </div>
          <div
            class="column-checkout d-flex flex-wrap flex-column flex-sm-row justify-content-between ml-auto py-3"
          >
            <div class="mb-2">
              <div class="font-weight-bold">Cena jednostkowa:</div>
              {{ product.price.toFixed(2) }} PLN
            </div>
            <div class="mb-2">
              <div class="font-weight-bold">Ilość:</div>
              {{ product.qty }} szt.
            </div>
            <div class="font-weight-bold mb-2">
              <div class="font-weight-bold">Wartość:</div>
              <s v-if="product.price_discount"
                >{{ (product.price_discount * product.qty).toFixed(2) }} PLN<br
              /></s>
              {{ (product.price * product.qty).toFixed(2) }} PLN
            </div>
          </div>
        </div>
      </div>
      <div
        class="checkout-bottom d-flex flex-column justify-content-between py-3 px-2 px-md-5"
      >
        <div class="d-flex justify-content-end w-100">
          <div class="shipping-column text-uppercase">
            <div
              class="d-flex justify-content-between flex-column flex-sm-row mb-2"
            >
              <div class="font-weight-bold">wartość zamówienia:</div>
              <div v-if="orderData" class="cart-prices">
                <!-- 219.00 PLN netto<br> -->
                {{ priceFormat(orderData.order_summary.basket_value) }} PLN
                brutto<br />
              </div>
            </div>
            <div
              class="d-flex justify-content-between mb-2 flex-column flex-sm-row"
            >
              <div class="font-weight-bold">metoda płatności:</div>
              <div>{{ payment }}</div>
            </div>
            <div
              class="d-flex justify-content-between mb-2 flex-column flex-sm-row"
            >
              <div class="font-weight-bold">sposób dostawy:</div>
              <div>{{ delivery.name }}</div>
            </div>
            <div
              v-if="orderData.shipping.inpost.point_name"
              class="d-flex justify-content-between mb-2 flex-column flex-sm-row"
            >
              <div class="font-weight-bold">wybrany paczkomat:</div>
              <div class="text-right">
                {{ orderData.shipping.inpost.point_name }}<br />
                {{ orderData.shipping.inpost.address }}
              </div>
            </div>
            <div
              class="d-flex justify-content-between mb-2 flex-column flex-sm-row"
            >
              <div class="font-weight-bold">kwota dostawy:</div>
              <div>{{ deliveryCost }} PLN</div>
            </div>
            <div
              class="d-flex justify-content-between mb-2 flex-column flex-sm-row "
            >
              <div class="font-weight-bold">suma zamówienia:</div>
              <div v-if="orderData" class="font-weight-bold">
                {{
                  priceFormat(
                    orderData.order_summary.basket_value + deliveryCost
                  )
                }}
                PLN
                {{ user.wholesale ? 'brutto' : '' }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex justify-content-start w-100 shipping-info pt-5 flex-wrap"
        >
          <div class="px-1 px-sm-3 px-md-0 px-lg-5 col-12 col-lg-4">
            <span class="text-uppercase font-weight-bold">Dane dostawy:</span>
            <div>
              <ul>
                <li>{{ orderData.shipping.name }}</li>
                <li style="word-break: break-all">
                  {{ orderData.shipping.email }}
                </li>
                <li>{{ orderData.shipping.phone }}</li>
                <li>{{ orderData.shipping.address }}</li>
                <li>
                  {{ orderData.shipping.zip }} {{ orderData.shipping.city }}
                </li>
                <li>{{ getCountryName(orderData.shipping.country) }}</li>
              </ul>
            </div>
          </div>
          <div class="px-1 px-sm-3 px-md-2 px-lg-5 col-12 col-lg-4">
            <span class="text-uppercase font-weight-bold">Dane faktury:</span>
            <div>
              <ul>
                <li>{{ orderData.billing.name }}</li>
                <li>{{ orderData.shipping.phone }}</li>
                <li>{{ orderData.billing.address }}</li>
                <li>
                  {{ orderData.billing.zip }} {{ orderData.billing.city }}
                </li>
                <li>{{ getCountryName(orderData.billing.country) }}</li>
              </ul>
            </div>
          </div>
          <div class="px-1 px-sm-3 px-md-2 px-lg-5 col-12 col-lg-4">
            <span class="text-uppercase font-weight-bold">Uwagi:</span>
            <p>
              Uwagi klienta...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emelAxios from '@/axios/emelAxios';
import getXSid from '@/helpers/xSid/getXSid';
import priceFormat from '@/helpers/priceFormat/priceFormat';
import getShippingCost from '@/helpers/cart/getShippingCost.js';

export default {
  data() {
    return {
      orderData: null,
    };
  },
  computed: {
    deliveryCost() {
      return this.getShippingCost(
        this.delivery.code,
        this.orderData.shipping.country
      );
    },
    delivery() {
      return this.$store.getters.deliveries.find(
        (delivery) => delivery.id == this.orderData.delivery.type
      );
    },
    payment() {
      return this.delivery.payment;
    },
    user() {
      return this.$store.getters.user;
    },
    countryList() {
      return this.$store.getters.countryList;
    },
  },
  methods: {
    getShippingCost,
    priceFormat,
    getCountryName(code) {
      return this.countryList.find((country) => country.code == code).name_pl;
    },
  },
  created() {
    this.$store.dispatch('countryList');
    this.$store.dispatch('deliveryPrices');
    emelAxios
      .get(`order/${this.$route.params.order_uuid}`, {
        headers: {
          'X-Sid': getXSid(),
        },
      })
      .then((res) => {
        this.orderData = res.data.data;
      });
  },
};
</script>

<style lang="scss" scoped>
section.cart-summary {
  margin-top: 150px;
  .cart-prices {
    @media (min-width: 576px) {
      text-align: right;
    }
  }
}
</style>
