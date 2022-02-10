<template>
  <section @click="dismissDropdowns" class="listing">
    <div class="header-slider" id="top">
      <div
        :style="
          `background-image: url(${$baseUrl}assets/front/img/Clip.webp);
            background-color: #E4E4E4;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
            height:530px;`
        "
        class="mobile-listing-header"
      ></div>
      <div class="item-content" style="bottom: 0px !important">
        <div
          class="
            d-flex
            flex-column
            justify-content-center
            tile-text-side
            mx-auto
          "
        >
          <h3 class="vibes-title text-center">New Arrivals</h3>
          <h2 class="cinzel-title text-center">
            {{ pageTitle }}
          </h2>
        </div>
      </div>
    </div>
    <section class="listing-nav">
      <div class="container">
        <nav class="navbar justify-content-center navbar-expand-lg">
          <button
            @click="setMobileCategories"
            class="navbar-toggler"
            type="button"
          >
            <span class="dark-blue-text"
              ><i class="fas fa-bars fa-1x"></i>
              Kategorie
            </span>
          </button>
          <button
            @click="setMobileFilters"
            class="navbar-toggler"
            type="button"
          >
            <span class="dark-blue-text"
              ><i class="fas fa-bars fa-1x"></i>
              Filtry
            </span>
          </button>
          <div
            :class="['collapse', 'navbar-collapse', { show: mobileCategories }]"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li
                :class="[
                  {
                    active:
                      category.id == $route.params.category_id ||
                      (!$route.params.category_id && category.id == 2),
                  },
                  'nav-item',
                ]"
                v-for="(category, i) in categories"
                :key="i"
              >
                <router-link
                  :to="{
                    name: 'ListingCategoryPage',
                    params: { category_id: category.id, page: 1 },
                  }"
                  class="nav-link"
                  :event="loading ? '' : 'click'"
                  >{{ category.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    <div
      class="d-flex justify-content-center justify-content-lg-around pb-1 mx-0 mx-lg-5 align-items-end filters-pagination-container"
    >
      <Filters class="pr-lg-5 pr-0" />
      <div>
        <Pagination />
      </div>
    </div>

    <div class="container">
      <div v-if="search" class="row">
        <h5>Szukasz po frazie:</h5>
        <strong>
          <h5 class="pl-1 font-weight-bold">{{ apiSession.search }}</h5>
        </strong>
      </div>
      <div
        class="col-12 p-5 d-flex flex-column align-items-center"
        v-if="loading"
      >
        <div class="mb-3">Trwa ładowanie produktów...</div>
        <div class="m-auto">
          <i class="fas fa-spinner fa-pulse fa-3x"></i>
        </div>
      </div>

      <div class="listing-content" v-else>
        <div v-if="listingMeta && listingMeta.totalPages != 0">
          <div id="listing" class="row w-100 justify-content-center mx-0">
            <div v-if="!listingLoading" class="forms">
              <form
                v-for="(product, i) in products"
                class="fastBuy col-12 col-lg-4 listing-item"
                :class="{ 'loading-product': loading }"
                :key="i"
              >
                <div class="sizings-item">
                  Rozmiary:
                  <div class="d-flex py-1">
                    <ul
                      v-if="cart.details"
                      class="list-group flex-wrap list-group-horizontal"
                    >
                      <li
                        class="list-group-item"
                        v-for="(item, j) in product.items"
                        :key="`list-group-item-${j}`"
                      >
                        <label
                          :class="[
                            'list-group-link',
                            getProductSizeClass(item),
                            getProductSizeActiveClass(item),
                            { 'list-group-link-socks': isSocks() },
                          ]"
                          @click.prevent="
                            getProductSizeClass(item) === 'sizesButton'
                              ? setItem(item)
                              : true
                          "
                          v-html="
                            isSocks() ? prepareSocksSize(item.size) : item.size
                          "
                        >
                          <input
                            type="radio"
                            name="size"
                            :readonly="!(item.qty > 0)"
                            :disabled="!(item.qty > 0)"
                            :required="item.qty > 0"
                          />
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="listing-img text-center pt-md-2 pt-2">
                  <div
                    @click.prevent="favouritesAction(product)"
                    class="heart-img"
                  >
                    <a class="heart-btn">
                      <img
                        v-lazy="
                          `${$baseUrl}assets/front/img/icons-menu/${getFavouriteIcon(
                            product.id
                          )}.svg`
                        "
                        class="img-fluid"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="item">
                    <router-link
                      :to="{
                        name: 'Product',
                        params: {
                          product_id: product.id,
                          product_name: slug(product.name),
                          category_name: slug(categoryNameProductLink()),
                        },
                      }"
                    >
                      <picture>
                        <source
                          type="image/webp"
                          v-lazy="
                            photoLink + 'webp/250/' + product.gfx + '.webp'
                          "
                        />
                        <source
                          type="image/jpeg"
                          v-lazy="photoLink + 'jpg/250/' + product.gfx + '.jpg'"
                        />
                        <img
                          v-lazy="photoLink + 'jpg/250/' + product.gfx + '.jpg'"
                          alt=""
                        />
                      </picture>
                    </router-link>
                  </div>
                </div>
                <div class="listing-item-heading">
                  <h5 class="font-weight-bold pt-3">{{ product.name }}</h5>
                  <div class="pb-3 pt-3 d-flex justify-content-between">
                    <span>{{ product.name }}</span>
                    <span
                      class="font-weight-bold"
                      v-if="product.price_discount"
                    >
                      <small>
                        <s>{{ product.price.to }} PLN</s>
                      </small>
                      <br />
                      <span class="font-weight-bold after-promotion">
                        {{ product.price_discount.to }} PLN
                      </span>
                    </span>
                    <span class="font-weight-bold" v-else>
                      {{ product.price.to }} PLN
                    </span>
                  </div>
                </div>
                <span>
                  <button
                    @click="addToCart(product)"
                    class="
                  custom-btn
                  text-center text-uppercase
                  p-2
                  w-100
                  add-to-cart
                "
                    type="button"
                  >
                    <span>dodaj do koszyka</span>
                  </button>
                </span>
              </form>
            </div>
            <section :class="['loader', 'p-5', { show: listingLoading }]">
              <div id="preloader">
                <div class="spinner">
                  <div class="cube1"></div>
                  <div class="cube2"></div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="w-100" v-else>
          <h1 class="products-not-found">
            Nie znaleziono produktów pasujących do wybranych filtrów!
          </h1>
        </div>
      </div>
      <div
        class="
          row
          justify-content-center
          pt-lg-4 pt-md-2
          div-up-button div-up-button-visible
        "
        id="div-up-button"
      >
        <a
          @click="scrollToTop()"
          class="btn custom-btn waves-effect waves-light ml-auto p-2 mb-0"
        >
          <span><i class="fas fa-2x fa-arrow-up text-white"></i></span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import Filters from "@/components/listing/Filters.vue";
import Pagination from "@/components/listing/Pagination.vue";
import findCategory from "@/helpers/categories/findCategory.js";
import setProducts from "@/helpers/products/setProducts";
import getProducts from "@/helpers/products/getProducts";
import cartPost from "@/helpers/cart/cartPost";
import addToFavourites from "@/helpers/favourites/addToFavourites";
import removeFromFavourites from "@/helpers/favourites/removeFromFavourites";
import slug from "@/helpers/slug/slug";
import alerts from "@/helpers/request/alerts";
import statusesKeys from "@/helpers/alertBox/statusesKeys";

window.addEventListener("scroll", () => {
  let listing = document.querySelector(".listing");
  let navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    listing?.classList.add("fixed-state");
    navbar?.classList.add("top-nav-collapse");
  } else {
    listing?.classList.remove("fixed-state");
    navbar?.classList.remove("top-nav-collapse");
  }
});

export default {
  name: "Listing",
  data() {
    return {
      photoLink: "https://sbox2.emel.com.pl/img/",
      selectedItem: null,

      search: "",
    };
  },
  computed: {
    apiSession() {
      return this.$store.getters.apiSession;
    },
    categories() {
      return this.$store.getters.categories;
    },
    category() {
      return this.$store.getters.category;
    },
    products() {
      return this.$store.getters.products;
    },
    loading() {
      return this.$store.getters.loading;
    },
    listingLoading() {
      return this.$store.getters.listingLoading;
    },
    listingMeta() {
      return this.$store.getters.listingMeta;
    },
    mobileCategories() {
      return this.$store.getters.mobileCategories;
    },
    favouriteProducts() {
      return this.$store.getters.favouriteProducts;
    },
    mobileFilters() {
      return this.$store.getters.mobileFilters;
    },
    filters() {
      return this.$store.getters.filters;
    },
    cart() {
      return this.$store.getters.cart;
    },
    pageTitle() {
      return this.category?.name ?? "Sklep";
    },
    filtersDropdowns() {
      return this.$store.getters["FiltersDropdowns/dropdowns"];
    },
    listingSessionStorageKeys() {
      return this.$store.getters[
        "ListingSessionStorageKeys/sessionStorageKeys"
      ];
    },
  },
  watch: {
    "$store.getters.changeFiltersFlag"() {
      if (this.$store.getters.changeFiltersFlag) {
        this.setProducts();
        this.$store.commit("changeFiltersFlag", false);
      }
    },
    "$route.params": {
      deep: true,
      handler(newParams, oldParams) {
        if (newParams.category_id != oldParams.category_id)
          this.watchCategoryIdHandler();
        else if (newParams.page != oldParams.page) this.watchPageHandler();
      },
    },
    products: {
      deep: true,
      handler(newProducts, oldProducts) {
        if (newProducts[0]?.name != oldProducts[0]?.name)
          setTimeout(
            () =>
              window.scrollTo({
                top: 50,
                behavior: "smooth",
                block: "nearest",
              }),
            50
          );
      },
    },
  },
  methods: {
    addToFavourites,
    setProducts,
    getProducts,
    isProductInFavourites(productId) {
      return Boolean(this.favouriteProducts.find((fav) => fav.id == productId));
    },
    favouritesAction(product) {
      this.isProductInFavourites(product.id)
        ? removeFromFavourites(product)
        : addToFavourites(product);
    },
    getFavouriteIcon(productId) {
      return this.isProductInFavourites(productId) ? "like_fill_2" : "like";
    },
    prepareSocksSize(size) {
      return `<sup>${size.split("/")[0]}</sup>/<sub>${
        size.split("/")[1]
      }</sub>`;
    },
    isSocks() {
      return this.$store.getters.type?.name == "Skarpetki";
    },
    categoryNameProductLink() {
      if (this.category?.name) return this.categories[0].name;
      return `${this.category.name}${
        this.filters.type ? `-${this.filters.type.name}` : ""
      }`;
    },
    slug,
    watchCategoryIdHandler() {
      this.$store.commit(
        "category",
        findCategory(this.categories, this.$route.params.category_id)
      );
      this.$store.commit("metaTitle", this.category?.name ?? "Sklep");

      this.$store.commit("filters", {
        sizes: new Set(),
        type: null,
        sex: null,
      });
      localStorage.removeItem("sizes");
      localStorage.removeItem("sex");
      localStorage.removeItem("type");
      this.setProducts();
    },
    watchPageHandler() {
      this.getProducts();
    },
    dismissDropdowns(e) {
      if (e.target.classList.contains("dropdown-toggle")) return;
      let activeDropdown = document.querySelector("#app .dropdown-menu.show");
      if (!activeDropdown) return;

      const rects = activeDropdown.getBoundingClientRect();

      if (
        e.clientX <= rects.left ||
        e.clientX >= rects.right ||
        e.clientY <= rects.top ||
        e.clientY >= rects.bottom
      ) {
        let newDropdowns = this.filtersDropdowns;
        for (const key in newDropdowns) newDropdowns[key] = false;
        this.$store.commit("FiltersDropdowns/dropdowns", newDropdowns);
      }
    },
    getProductSizeClass(item) {
      let activeClass = "sizesButton";
      let disabledClass = "disabled-size";

      if (item.qty == 0) return disabledClass;

      let cartQty = this.cart.details?.find(
        (prod) => prod.item_id == item.item_id && prod.size == item.size
      )?.qty;
      if (!cartQty) return activeClass;

      return cartQty < item.qty ? activeClass : disabledClass;
    },
    getProductSizeActiveClass(item) {
      return {
        "btn-sizing-active": Object.entries(item).every(
          (pair) => this.selectedItem?.[pair[0]] === pair[1]
        ),
      };
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
        block: "nearest",
      });
    },
    setItem(item) {
      this.selectedItem = item;
    },
    setMobileFilters() {
      this.$store.commit("mobileFilters", !this.mobileFilters);
    },
    setMobileCategories() {
      this.$store.commit("mobileCategories", !this.mobileCategories);
    },
    fetchDataFromSessionStorage() {
      this.listingSessionStorageKeys.forEach((key) =>
        this.$store[key.method](
          key.key,
          JSON.parse(sessionStorage.getItem(key.key))
        )
      );
    },
    fetchListingData() {
      const page = this.$route.params.page;
      if (!this.$route.params.category_id && !page) {
        this.setProducts();
        return;
      }
      if (
        this.listingSessionStorageKeys.some((key) =>
          sessionStorage.getItem(key.key)
        ) ||
        (page && page > 1)
      )
        this.fetchDataFromSessionStorage();
    },
    addToCart(product) {
      if (!this.selectedItem || Object.entries(this.selectedItem).length == 0) {
        this.$store.commit("alertBox", {
          status: statusesKeys.error,
          message: alerts.nonChoosedSizeError,
        });
        return;
      }

      let currentProduct = this.cart.details.find(
        (cartProduct) => cartProduct.item_id == this.selectedItem.item_id
      );
      let newQty = (currentProduct?.qty << 0) + 1;

      cartPost({
        id: product.id,
        item_id: this.selectedItem.item_id,
        pos: this.selectedItem.pos,
        qty: newQty,
        size: this.selectedItem.size,
      });
      if (this.selectedItem.qty === newQty) {
        this.selectedItem = null;
        return;
      }
    },
  },
  created() {
    this.setProducts();
    this.$store.commit("category", this.categories[0]);
    this.$store.commit("metaTitle", this.category?.name);
    const page = this.$route.params.page;
    if (page && page != 1)
      this.$router.push({
        params: {
          page: 1,
        },
      });
  },

  components: {
    Filters,
    Pagination,
  },
};
</script>

<style scoped>
.forms {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.fastBuy:hover :is(.add-to-cart, .sizings-item) {
  display: unset;
  visibility: unset;
}

.products-not-found {
  font-size: 1.5rem;
  text-align: center;
  font-weight: 500;
}

.sizings-item .list-group-item {
  width: unset;
}

.list-group-link {
  width: 30px;
  height: 30px;
}

main {
  padding-bottom: 8rem;
}
.mobile-listing-header {
  transition: height 0.5s;
}

@media (max-width: 992px) {
  :is(.sizings-item, .add-to-cart) {
    display: block !important;
    visibility: unset;
  }
  .sizings-item {
    position: static;
  }
}

@media (min-width: 992px) {
  .fixed-state .listing-nav {
    position: fixed;
    width: 100%;
    top: 80px;
    z-index: 300;
    z-index: 1000;
  }
  .fixed-state .listing-content {
    margin-top: 300px;
  }

  .fixed-state .mobile-listing-header {
    height: 0 !important;
  }
  .fixed-state .item-content {
    display: none;
  }
  .fixed-state .filters-pagination-container {
    position: fixed;
    top: 136px;
    width: 100%;
    background-color: #fff;
    z-index: 999;
    padding-bottom: 2rem !important;
  }
}

.listing-content #preloader {
  position: static;
  width: 100px;
  height: 100px;
  background-color: #fff;
  z-index: 1100;
  top: 0;
  margin: auto;
}

@media (max-width: 400px) {
  .listing-img img {
    width: 100% !important;
    height: auto;
    max-height: unset;
  }
}
</style>
