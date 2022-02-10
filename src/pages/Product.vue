<template>
  <section
    v-if="product && product.data && product.includes"
    id="vue_product"
    class="checkout product"
  >
    <div class="container">
      <div class="row">
        <div class="col-lg-6 ">
          <p class="history product-history">
            <a :href="`${$baseUrl}`">Home</a> >
            <router-link :to="{ name: 'Listing' }">Sklep</router-link> >
            <span>{{ product.data.name }}</span>
          </p>
          <div class="position-relative">
            <a
              v-if="!favouriteProducts.find((fav) => fav.id == product.data.id)"
              @click.prevent="addToFavourites(product.data)"
              class="heart-btn"
            >
              <img
                v-lazy="`${$baseUrl}assets/front/img/icons-menu/like.svg`"
                class="img-fluid"
                width="40px"
                alt=""
              />
            </a>
            <a
              v-else
              @click.prevent="removeFromFavourites(product.data)"
              class="heart-btn"
            >
              <img
                v-lazy="
                  `${$baseUrl}assets/front/img/icons-menu/like_fill_2.svg`
                "
                class="img-fluid"
                width="40px"
                alt=""
              />
            </a>
            <carousel
              :margin="10"
              nav="true"
              dots="true"
              :navText="navText"
              :items="1"
              :animateOut="''"
              :animateIn="''"
            >
              <div
                v-for="(photo, i) in product.data.gfx_ids"
                :key="`productPhoto-${i}`"
                class="item item-lightbox-photo"
              >
                <a
                  data-lightbox="product"
                  :href="`${photoLink}webp/540/${photo}.webp`"
                >
                  <img
                    v-lazy="`${photoLink}webp/540/${photo}.webp`"
                    class="img-fluid"
                    alt=""
                  />
                </a>
              </div>
            </carousel>
          </div>
        </div>
        <div class="col-lg-6 d-flex flex-column pt-lg-0 pt-5 pb-3">
          <h2 class="font-weight-bold">
            {{ product.data.name }}
          </h2>
          <div
            class="pb-5 pt-3 d-flex justify-content-between"
            v-if="product.data.price_discount || product.data.price"
          >
            <span class="font-weight-bold" v-if="product.data.price_discount">
              <small>
                <s>{{ product.data.price.to }} PLN</s>
              </small>
              <br />
              <span class="font-weight-bold after-promotion">
                {{ product.data.price_discount.to }} PLN
              </span>
            </span>
            <span class="price-product font-weight-bold" v-else>
              {{ product.data.price.to }} PLN
            </span>
            <span>kod produktu: {{ product.data.name }}</span>
          </div>
          <div class="sizes py-3">
            <div class="d-flex">
              <span class="font-weight-bold text-uppercase">Rozmiary:</span>
              <div class="w-75">
                <label
                  v-for="(size, i) in product.data.items"
                  :key="`size-0-${i}`"
                  class="notranslate"
                >
                  <div
                    v-if="sizeAvailable(size)"
                    @click="setSize(size, $event)"
                    class="sizesButton mx-2 mb-2 btn-sizing custom-btn notranslate"
                    type="button"
                  >
                    <span class="notranslate">{{ size.size }}</span>
                  </div>
                  <div v-else class="mx-2 mb-2 btn-sizing no_qty notranslate">
                    <span class="notranslate">{{ size.size }}</span>
                  </div>
                </label>
              </div>
            </div>
            <span :id="`submitThisForm${product.data.id}button`">
              <button
                class="custom-btn add-to-cart text-uppercase font-weight-bold"
                type="button"
                @click="addToCart"
                style="display: block !important;"
              >
                <span>dodaj do koszyka</span>
              </button>
            </span>
            <div class="table-sizes d-flex align-items-center">
              <div
                class="w-auto pr-lg-0 pr-4 position-relative sizes-container"
              >
                <div
                  class="top"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Rozmiar obuwia"
                ></div>
                <div
                  class="bottom"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Wymiar wewnętrzny (cm)"
                ></div>
                <img
                  v-lazy="`${$baseUrl}assets/front/img/group_2.svg`"
                  class="img-fluid shoe-icon"
                  alt="ikona obuwia"
                />
              </div>
              <div class="d-flex pl-3 table-sizes-table">
                <div class="m-0 row py-3 scrollable">
                  <ul
                    class="w-100 list-group list-group-horizontal border-bottom py-3 shipping-info shipping-info-product notranslate"
                  >
                    <li
                      v-for="(size, i) in product.data.items"
                      :key="`insole-${i}`"
                      class="list-group-item mx-2 text-center"
                    >
                      {{ size.insole.toFixed(2) }}
                    </li>
                  </ul>
                  <ul
                    class="w-100 list-group list-group-horizontal py-3 shipping-info shipping-info-product notranslate"
                  >
                    <li
                      v-for="(size, i) in product.data.items"
                      :key="`size-1-${i}`"
                      class="list-group-item mx-2 text-center"
                    >
                      {{ size.size }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-5 text-uppercase ">
            <a
              v-if="productLinks[4]"
              :href="productLinks[4].link"
              :title="productLinks[4].title"
            >
              <u class="link-product">{{ productLinks[4].title }}</u>
              <i class="fas fa-long-arrow-alt-right ml-2"></i>
            </a>
          </div>
          <div class="py-3 d-flex flex-wrap align-items-center colors">
            <span class="custom-width font-weight-bold text-uppercase pr-3"
              >Kolory:</span
            >
            <router-link
              v-for="(color, i) in product.relations.other"
              :key="`color-${i}`"
              :to="{
                name: 'Product',
                params: {
                  product_id: color.item_id,
                  product_name: slug(color.item_name),
                },
              }"
            >
              <img
                v-lazy="`${photoLink}webp/100/${color.gfx_id}.webp`"
                class="img-fluid"
                alt=""
              />
            </router-link>
          </div>

          <div class="py-3 accordion">
            <h6
              v-if="link.id != 5"
              v-for="(link, i) in productLinks"
              :key="`link-${i}`"
              class="mb-4 text-uppercase"
            >
              <a
                v-if="link.id == 4"
                :href="`${link.link}?produkt=${product.name}`"
                target="_blank"
                ><i class="fas fa-plus pr-3"></i>{{ link.title }}</a
              >
              <a v-else :href="link.link" target="_blank"
                ><i class="fas fa-plus pr-3"></i>{{ link.title }}</a
              >
            </h6>
          </div>

          <div v-if="product.includes.description">
            <span class="font-weight-bold text-uppercase">Opis:</span>
            <div class="py-3">{{ product.includes.description }}</div>
          </div>
        </div>
      </div>
      <div v-if="true" class="row border-top my-5">
        <h2 class="cinzel-title text-center py-3 w-100">Polecane produkty</h2>
        <carousel
          class="w-100"
          :items="3"
          :margin="30"
          nav="true"
          :dots="false"
          :navText="navText"
          :animateOut="''"
          :animateIn="''"
          rewind="true"
          :responsive="{ 0: { items: 1 }, 992: { items: 3 } }"
        >
          <div
            v-for="(recommendedProduct, i) in 6"
            :key="`recommended-product-${i}`"
            class="item"
          >
            <router-link
              :to="{
                name: 'Product',
                params: {
                  product_id: 8456,
                  product_name: 'E 1073-1',
                  category_name: 'roczki',
                },
              }"
            >
              <div class="listing-img text-center">
                <img
                  :src="`https://sbox2.emel.com.pl/img/jpg/250/94592.jpg`"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="listing-item-heading">
                <h5 class="font-weight-bold pt-3">E 1073-1 {{ i }}</h5>
                <div class="pb-3 pt-3 d-flex justify-content-between ">
                  <span>E 1073-1</span>
                  <span v-if="user.wholesale" class="font-weight-bold">
                    <small class="text-dark"> 219.00 netto </small><br />
                    219.00 brutto
                  </span>
                  <span class="text-dark font-weight-bold">
                    219.00 PLN
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </carousel>
      </div>
    </div>
  </section>
  <section v-else id="vue_product" class="checkout product m-5 text-center">
    Przykro nam taki produkt nie istnieje!
  </section>
</template>

<script>
import emelAxios from "@/axios/emelAxios";
import carousel from "owl-carousel-vuejs";
import lightbox2 from "lightbox2";
import "lightbox2/dist/css/lightbox.min.css";
import slug from "@/helpers/slug/slug";
import getXSid from "@/helpers/xSid/getXSid";
import cartPost from "@/helpers/cart/cartPost";
import alerts from "@/helpers/request/alerts";
import statusesKeys from "@/helpers/alertBox/statusesKeys";
import addToFavourites from "@/helpers/favourites/addToFavourites";
import removeFromFavourites from "@/helpers/favourites/removeFromFavourites";

export default {
  components: {
    carousel,
  },
  data() {
    return {
      photoLink: "https://sbox2.emel.com.pl/img/",
      product: {},
      selectedSize: {},
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>',
      ],
    };
  },
  watch: {
    "$route.params.product_id"() {
      this.getProduct();
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    productLinks() {
      return this.$store.getters.productLinks;
    },
    favouriteProducts() {
      return this.$store.getters.favouriteProducts;
    },
    user() {
      return this.$store.getters.user;
    },
    cart() {
      return this.$store.getters.cart;
    },
  },
  methods: {
    addToFavourites,
    removeFromFavourites,
    sizeAvailable(item) {
      if (item.qty == 0) return false;

      let cartQty = this.cart.details?.find(
        (prod) => prod.item_id == item.item_id && prod.size == item.size
      )?.qty;
      if (!cartQty) return true;

      return cartQty < item.qty;
    },
    slug,
    addToCart() {
      if (Object.entries(this.selectedSize).length == 0) {
        this.$store.commit("alertBox", {
          status: statusesKeys.error,
          message: alerts.nonChoosedSizeError,
        });
        return;
      }

      let currentProduct = this.cart.details.find(
        (cartProduct) => cartProduct.item_id == this.selectedSize.item_id
      );

      let newQty = (currentProduct?.qty << 0) + 1;

      cartPost({
        id: this.product.data.id,
        item_id: this.selectedSize.item_id,
        pos: this.selectedSize.pos,
        qty: newQty,
        size: this.selectedSize.size,
      });

      if (this.selectedSize.qty === newQty) {
        this.selectedSize = {};
        return;
      }
    },
    setSizeButtonActiveClass(button) {
      document
        .querySelectorAll(".sizesButton")
        .forEach((button) => button.classList.remove("btn-sizing-active"));
      button.classList.toggle("btn-sizing-active");
    },
    setSize(size, event) {
      this.setSizeButtonActiveClass(
        event?.composedPath().find((el) => el.classList.contains("sizesButton"))
      );

      this.selectedSize = size;
    },
    async getProduct() {
      let xSid = getXSid();
      if (!xSid) await this.$store.dispatch("setup");
      this.$store.commit("loading", true);
      const stopLoading = () => this.$store.commit("loading", false);
      emelAxios
        .get(`item/get/${this.$route.params.product_id}`, {
          headers: {
            "X-Sid": getXSid(),
          },
        })
        .then((res) => {
          this.product = res.data;
          this.$store.commit("metaTitle", res.data.data.name);
          stopLoading();
        })
        .catch((err) => {
          stopLoading();
        });
    },
  },
  created() {
    this.getProduct();
    this.$store.dispatch("productLinks");
  },
};
</script>

<style scoped>
.product {
  padding-top: 100px;
}

.owl-carousel {
  display: block !important;
}
.heart-btn {
  position: absolute;
  right: 0;
  z-index: 3;
  top: 0;
}

.sizes-container {
  position: relative;
}
.sizes-container .top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 3;
}
.sizes-container .bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 3;
}
</style>
