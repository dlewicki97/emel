<template>
  <section class="cart-products container">
    <div class="checkout-box">
      <div class="checkout-header p-4">
        <h2 class="text-uppercase font-weight-bold">koszyk</h2>
      </div>
      <span id="cartTable">
        <div class="checkout-content pt-xl-5 pt-2 pl-xl-5 pl-2 pr-xl-5 pr-2">
          <div
            v-for="(product, i) in cart"
            :key="`cart-product-${i}`"
            class="d-flex content-column justify-content-between py-5 border-bottom"
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
                  alt="bucik"
                  width="230"
                />
              </router-link>
            </div>
            <div class="d-flex flex-column">
              <p class="model">{{ product.name }}</p>
              <p class="text-uppercase font-weight-bold">
                <router-link
                  :to="{
                    name: 'Product',
                    params: {
                      product_id: product.id,
                      product_name: product.name,
                      category_name: 'roczki',
                    },
                  }"
                  class="font-weight-bold"
                >
                  {{ product.name }}
                </router-link>
              </p>
              <p>
                <span class="font-weight-bold">Rozmiar:</span>
                {{ product.size }}
              </p>
            </div>

            <div
              class="column-checkout d-flex justify-content-between flex-column flex-lg-row ml-auto py-3"
            >
              <div class="mb-4 col-12 col-lg-4 px-0">
                <div class="border-bottom mb-2">Cena</div>
                <div class="pt-2">
                  <s v-if="product.price_discount"
                    ><small>{{ product.price_discount.toFixed(2) }} PLN</small
                    ><br
                  /></s>
                  {{ product.price.toFixed(2) }} PLN
                </div>
              </div>
              <div class="mb-4 col-12 col-lg-4 px-0">
                <div class="border-bottom mb-2">Ilość</div>
                <div v-if="!userWholesale" class="pt-3">
                  <input
                    class="form-control qty-field d-flex"
                    :value="product.qty"
                    step="1"
                    min="1"
                    type="number"
                    @input="editProductAmount(product, $event)"
                  />
                </div>
                <div class="d-flex flex-wrap align-items-center" v-else>
                  <div
                    v-for="(variant, j) in product.variants"
                    :key="`product-${i}-variant-${j}`"
                    class="size-block"
                  >
                    <i
                      @click="removeProductFromCart(variant)"
                      class="far fa-trash-alt px-2 mx-auto pb-2 delete-variant-icon"
                    ></i>
                    <div class="size">{{ variant.size }}</div>
                    <input
                      class="amount"
                      type="text"
                      v-model="variant.qty"
                      @keyup="variantQtyInputHandler(variant)"
                    />
                  </div>
                </div>
              </div>
              <div
                class="font-weight-bold d-flex flex-wrap flex-column col-12 col-lg-4 px-0"
              >
                <div class="border-bottom mb-2">Wartość</div>
                <div class="d-flex flex-wrap align-items-center mt-2">
                  <div>
                    <s v-if="product.price_discount"
                      ><small
                        >{{
                          (
                            product.price_discount *
                            (userWholesale
                              ? product.variants.reduce((t, i) => i.qty + t, 0)
                              : product.qty)
                          ).toFixed(2)
                        }}
                        PLN</small
                      ><br
                    /></s>
                    <strong
                      >{{
                        (
                          product.price *
                          (userWholesale
                            ? product.variants.reduce((t, i) => i.qty + t, 0)
                            : product.qty)
                        ).toFixed(2)
                      }}
                      PLN</strong
                    >
                  </div>
                  <div>
                    <a
                      v-if="!userWholesale"
                      @click="removeProductFromCart(product)"
                      class="icon-btn pl-3"
                      ><i class="far fa-trash-alt px-2"></i
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>
      <div
        class="checkout-bottom content-column d-flex justify-content-between py-3 px-2 px-md-5"
      >
        <div v-if="false" class="flex-grow-1 py-3 py-md-0">
          <form class="input-group">
            <input
              v-model="dicountCode"
              type="text"
              class="form-control"
              placeholder="Wpisz tutaj kod rabatowy"
              aria-label="kod_rabatowy"
              aria-describedby="button-addon2"
              name="discount"
              required
            />
            <div class="input-group-append">
              <button
                @click="applyDiscountCode"
                class="btn btn-md btn-outline-default m-0 px-3 py-2 z-depth-0 waves-effect"
                id="button-addon2"
              >
                Użyj
              </button>
            </div>
          </form>
        </div>
        <div
          v-if="basket.summary"
          id="amountSuma"
          class="column-checkout d-flex justify-content-center align-items-center text-uppercase font-weight-bold"
        >
          Razem: {{ priceFormat(basket.summary.basket_value) }} PLN
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import cartPost from '@/helpers/cart/cartPost';
import priceFormat from '@/helpers/priceFormat/priceFormat';
import statusesKeys from '@/helpers/alertBox/statusesKeys';

export default {
  data() {
    return {
      dicountCode: '',
      orderTypes: {
        retail: 1,
        wholesale: 2,
        wholesaleProduction: 3,
      },
    };
  },
  computed: {
    userWholesale() {
      return this.$store.getters.isUserWholesale;
    },
    basket() {
      return this.$store.getters.cart;
    },
    cartProductsData() {
      return this.$store.getters.cartProductsData;
    },
    cart() {
      return this.userWholesale
        ? this.basket?.details?.reduce((t, i) => {
            let product = t.find((prod) => prod.id === i.id);
            let variant = {
              gfx: i.gfx,
              id: i.id,
              item_id: i.item_id,
              name: i.name,
              pos: i.pos,
              price: i.price,
              qty: i.qty,
              size: i.size,
            };

            if (!product) {
              product = {
                id: i.id,
                name: i.name,
                price: i.price,
                gfx: i.gfx,
                variants: [variant],
              };
              t.push(product);
            } else product.variants.push(variant);

            return t;
          }, [])
        : this.basket?.details;
    },
  },
  methods: {
    priceFormat,
    variantQtyInputHandler(variant) {
      let qty = Number(variant.qty);
      if (isNaN(qty)) {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: `Proszę wpisać poprawną liczbę!`,
        });
        return;
      }

      this.editProductAmount(variant, {
        target: {
          value: qty,
        },
      });
    },
    editProductAmount(product, event) {
      let qty = event.target.value;
      let productData = this.cartProductsData.find(
        (cardProd) => cardProd.data.id == product.id
      );
      let maxQty = productData.data.items[+product.size].qty;
      if (maxQty < qty || qty == '') {
        event.target.value = maxQty;
        return;
      }
      if (qty < 1) return;
      cartPost({
        id: product.id,
        item_id: product.item_id,
        pos: product.pos,
        qty,
        size: product.size,
      });
    },
    applyDiscountCode() {},
    removeProductFromCart(product) {
      cartPost({
        id: product.id,
        item_id: product.item_id,
        pos: product.pos,
        qty: 0,
        size: product.size,
      });
    },
    isWholesaleProduction() {
      return Boolean(localStorage.getItem('wholesaleProduction'));
    },
    getOrderType(userWholesale) {
      if (!userWholesale) return this.orderTypes.retail;
      else
        return this.isWholesaleProduction()
          ? this.orderTypes.wholesaleProduction
          : this.orderTypes.wholesale;
    },
    saveOrderData() {
      let orderData = JSON.parse(localStorage.getItem('orderData')) ?? {};

      orderData.order_type = this.getOrderType(this.userWholesale);

      localStorage.setItem('orderData', JSON.stringify(orderData));
    },
  },
  created() {
    this.saveOrderData();
  },
};
</script>

<style scoped>
.size-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem;
}
.size-block .size {
  text-align: center;
  background-color: #ee2722;
  color: white;
  border-radius: 5px;
}
.size-block input {
  max-width: 50px;
  text-align: center;
}
.size-block .delete-variant-icon {
  opacity: 0;
  transition: opacity 0.2s;
  cursor: pointer;
}
.size-block:hover .delete-variant-icon {
  opacity: 1;
}
</style>
