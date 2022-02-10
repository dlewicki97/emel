<template>
    <section class="cart-summary container">
        <div class="checkout-box">
          <div class="checkout-header p-4">
            <h2 class="text-uppercase font-weight-bold">{{ orderDetailsPage ? 'Szczegóły zamówienia' : 'podsumowanie' }}</h2>
          </div>
          <div class="checkout-content pt-xl-5 pt-2 pl-xl-5 pl-2 pr-xl-5 pr-2">
            
            
            <div v-for="product in cart" :key="`product-cart-summary-${product.item_id}`" class="d-flex content-column justify-content-between py-5 border-md-top border-bottom">
              <div class="text-center">
                <router-link :to="{
                    name: 'Product',
                    params: {
                      product_id: product.id,
                      product_name: product.name,
                      category_name: 'roczki',
                    },
                  }">
                  <img v-lazy="`https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`" class="img-fluid" alt="" width="124">
                </router-link>
              </div>
              <div class="d-flex flex-column">
                <p class="model">{{ product.name }}</p>
                <p class="text-uppercase font-weight-bold">{{ product.name }}</p>
                <p>
                  <span class="font-weight-bold">Rozmiar:</span> {{ product.size }}
                </p>
              </div>
              <div class="column-checkout d-flex flex-wrap flex-column flex-sm-row justify-content-between ml-auto py-3">
                <div class="mb-2"><div class="font-weight-bold">Cena jednostkowa:</div>{{
                        (product.price).toFixed(2)
                      }} PLN</div>
                <div class="mb-2"><div class="font-weight-bold">Ilość:</div> {{ product.qty }} szt.</div>
                <div class="font-weight-bold mb-2">
                  <div class="font-weight-bold">Wartość:</div>
                  <s v-if="product.price_discount">{{ (product.price_discount * product.qty).toFixed(2) }} PLN<br></s>
                  {{ (product.price * product.qty).toFixed(2) }} PLN
                </div>
              </div>
            </div>
          </div>
          <div class="checkout-bottom d-flex flex-column justify-content-between py-3 px-2 px-md-5">
            <div class="d-flex justify-content-end w-100">
              <div class="shipping-column text-uppercase">
                  <div class="d-flex justify-content-between flex-column flex-sm-row mb-2">
                    <div class="font-weight-bold">wartość zamówienia:</div>
                    <div v-if="basket.summary" class="cart-prices">
                      <!-- 219.00 PLN netto<br> -->
                      {{ priceFormat(basket.summary.basket_value) }} PLN brutto<br>
                    </div>
                  </div>
                <div class="d-flex justify-content-between mb-2 flex-column flex-sm-row">
                  <div class="font-weight-bold">metoda płatności:</div> <div>{{ payment }}</div>
                </div>
                <div class="d-flex justify-content-between mb-2 flex-column flex-sm-row">
                  <div class="font-weight-bold">sposób dostawy:</div> <div>{{ delivery.name }}</div>
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
                <div class="d-flex justify-content-between mb-2 flex-column flex-sm-row">
                  <div class="font-weight-bold">kwota dostawy:</div> <div>{{ deliveryCost }} PLN</div>
                </div>
                <div class="d-flex justify-content-between mb-2 flex-column flex-sm-row ">
                  <div class="font-weight-bold">suma zamówienia:</div>
                  <div v-if="basket.summary" class="font-weight-bold">
                    
                    {{ priceFormat(basket.summary.basket_value + deliveryCost) }} PLN {{ user.wholesale ? 'brutto' : '' }}
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-start w-100 shipping-info pt-5 flex-wrap">
              <div class="px-1 px-sm-3 px-md-0 px-lg-5 col-12 col-lg-4">
                <span class="text-uppercase font-weight-bold">Dane dostawy:</span>
                <p>
                  <ul>
                    <li>{{ orderData.shipping.name }}</li>
                    <li style="word-break: break-all">{{ orderData.shipping.email }}</li>
                    <li>{{ orderData.shipping.phone }}</li>
                    <li>{{ orderData.shipping.address }}
                        
                    </li>
                    <li>{{ orderData.shipping.zip }} {{ orderData.shipping.city }}</li>
                    <li>{{ getCountryName(orderData.shipping.country) }}</li>
                  </ul>
                </p>
              </div>
              <div class="px-1 px-sm-3 px-md-2 px-lg-5 col-12 col-lg-4">
                <span class="text-uppercase font-weight-bold">Dane faktury:</span>
                <p>
                  <ul>
                    <li>{{ orderData.billing.name }}</li>
                    <li>{{ orderData.shipping.phone }}</li>
                    <li>{{ orderData.billing.address }}</li>
                    <li>{{ orderData.billing.zip }} {{ orderData.billing.city }}</li>
                    <li>{{ getCountryName(orderData.billing.country) }}</li>
                  </ul>
                </p>
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
        <div v-if="!this.orderDetailsPage" class="row my-3 px-3 justify-content-center">
          <div class="col-md-12">
            <div class="form-check pl-0">
              <input type="checkbox" class="form-check-input" id="regulamin" name="regulamin" v-model="regulations">
              <label class="form-check-label" for="regulamin">
                <small>Oświadczam, że zapoznałem się z <a :href="`${$baseUrl}regulamin`" style="text-decoration: underline;"><small>Regulaminem</small></a> sklepu EMEL s.c. co jest równoznaczne z wyrażeniem zgody na przetwarzanie moich danych osobowych w ramach opisanych w niniejszym regulaminie. <span class="text-muted  ">*</span></small></label>
            </div>
          </div>
        </div>
    </section>
</template>

<script>
import priceFormat from "@/helpers/priceFormat/priceFormat";
import getShippingCost from '@/helpers/cart/getShippingCost.js';

    export default {
      props: ['orderId'],
      data() {
        return  {
          regulations: false,
        }
      },
      methods: {
        getShippingCost,
        priceFormat,
        getCountryName(code) {
          return this.countryList.find(country => country.code == code).name_pl;
        }
      },
        computed: {
          deliveryCost() {
            return getShippingCost(this.delivery.code, this.orderData.shipping.country);
          },
          countryList() {
            return this.$store.getters.countryList;
          },
          payment() {
            return this.delivery.payment;
          },
          delivery() {
            return this.$store.getters.deliveries.find(delivery => delivery.id == this.orderData.delivery);
          },
            user() {
                return this.$store.getters.user;
            },
            basket() {
                return this.$store.getters.cart;
            },
            cart() {
                return this.basket?.details ?? [];
            },
            orderDetailsPage() {
              return Boolean(this.orderId);
            },
            orderData() {
              return JSON.parse(localStorage.getItem('orderData'));
            }
        },
        created() {
          this.$store.dispatch('countryList')
          this.$store.dispatch('deliveryPrices');
        }

    }
</script>

<style lang="scss" scoped>
section.cart-summary {

  .cart-prices {
    @media(min-width: 576px) {
      text-align: right;
    }

  }
}
</style>