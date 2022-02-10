<template>
  <header>
    <div class="header-nav">
      <div class="container-fluid">
        <div class="row ">
          <nav
            :class="[
              'navbar',
              'navbar-expand-lg',
              'navbar-dark',
              'fixed-top',
              'top-nav-collapse',
            ]"
          >
            <div class="container navbar-container custom-container">
              <div v-if="settings.logo" class="logo-brand">
                <a :href="$baseUrl">
                  <img
                    v-lazy="`${$baseUrl}uploads/${settings.logo}`"
                    class="img-fluid"
                    :alt="`${settings.meta_title}`"
                  />
                </a>
              </div>
              <div
                :class="[
                  'collapse',
                  'navbar-collapse',
                  'navbar-collapse-custom',
                  'navbar-collapse-mobile',
                  { show: showCollapse },
                ]"
                id="basicExampleNav"
              >
                <div class="upper-div" style="height: 20px;"></div>
                <div class="d-flex container navbar-content custom-container_2">
                  <ul class="navbar-nav">
                    <li
                      :class="['nav-item', { active: $route.name === 'About' }]"
                    >
                      <a
                        class="nav-link menu-li-item"
                        :href="`${$baseUrl}poradnik/dlaczego-emele/1`"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/kon_emel.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        dlaczego emele?
                      </a>
                    </li>
                    <li
                      :class="[
                        'nav-item',
                        { active: $route.name === 'Listing' },
                      ]"
                    >
                      <router-link
                        class="nav-link menu-li-item"
                        :to="{ name: 'Listing' }"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/shop-3.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        sklep
                      </router-link>
                    </li>

                    <li
                      v-if="!logged"
                      :class="[
                        'nav-item',
                        { active: $route.name === 'LoginRegister' },
                        'mobile-menu-nav-item',
                      ]"
                    >
                      <router-link
                        class="nav-link menu-li-item"
                        :to="{ name: 'LoginRegister' }"
                        title="Zaloguj się lub zarejestruj"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/user.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        konto
                      </router-link>
                    </li>
                    <li
                      v-else
                      :class="[
                        'nav-item',
                        { active: $route.name === 'Guide' },
                        'mobile-menu-nav-item',
                      ]"
                    >
                      <div class="dropdown">
                        <a
                          class="nav-link menu-li-item dropdown-toggle color-inherit"
                          type="button"
                          id="dropdownMenu1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            v-lazy="`${$baseUrl}assets/front/img/user.svg`"
                            class="img-fluid mobile-menu-icon"
                            alt=""
                          />
                          konto
                        </a>

                        <div
                          class="dropdown-menu dropdown-primary absolute-margin"
                        >
                          <a class="dropdown-item" to="/profil/zamowienia"
                            >Moje zamówienia</a
                          >
                          <a
                            v-if="typeAccount == '0'"
                            class="dropdown-item"
                            to="/profil/materialy-marketingowe"
                            >Mat. marketingowe</a
                          >
                          <a class="dropdown-item" to="/profil/ustawienia">
                            Ustawienia konta</a
                          >
                          <div class="dropdown-item" @click.prevent="logout">
                            Wyloguj się
                          </div>
                        </div>
                      </div>
                    </li>

                    <li
                      :class="['nav-item', { active: $route.name === 'Guide' }]"
                    >
                      <div class="dropdown">
                        <a
                          title="Poradnik"
                          :href="`${$baseUrl}poradnik`"
                          class="nav-link menu-li-item dropdown-toggle color-inherit"
                          type="button"
                          id="dropdownMenu1"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img
                            v-lazy="`${$baseUrl}assets/front/img/owl.svg`"
                            class="img-fluid mobile-menu-icon"
                            alt=""
                          />
                          Poradnik
                        </a>

                        <div
                          class="dropdown-menu dropdown-primary absolute-margin"
                        >
                          <a
                            v-for="(poradnik, i) in poradnikCategory"
                            :key="i"
                            class="dropdown-item dropdown-item-emel"
                            :href="
                              `${$baseUrl}poradnik/${slug(poradnik.title)}/${
                                poradnik.id
                              }`
                            "
                            >{{ poradnik.title }}</a
                          >
                        </div>
                      </div>
                    </li>
                    <li
                      :class="['nav-item', { active: $route.name === 'Blog' }]"
                    >
                      <a
                        class="nav-link menu-li-item"
                        :href="`${$baseUrl}blog`"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/footprints.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        blog
                      </a>
                    </li>
                    <li
                      :class="[
                        'nav-item',
                        { active: $route.name === 'WhereBuy' },
                      ]"
                    >
                      <a
                        class="nav-link menu-li-item"
                        :href="`${$baseUrl}gdzie-kupic`"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/destination.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        gdzie kupić?
                      </a>
                    </li>
                    <li
                      :class="[
                        'nav-item',
                        { active: $route.name === 'Contact' },
                      ]"
                    >
                      <a
                        class="nav-link menu-li-item"
                        :href="`${$baseUrl}kontakt`"
                      >
                        <img
                          v-lazy="`${$baseUrl}assets/front/img/phone.svg`"
                          class="img-fluid mobile-menu-icon"
                          alt=""
                        />
                        kontakt
                      </a>
                    </li>

                    <li
                      style="display: flex;align-items: center;margin: auto;width: 100%!important;left: 0;margin-top: 2rem;"
                      class="mobile-menu-icon"
                    >
                      <div
                        class="icons-wrapper pb-5 d-flex"
                        style="width: min-content;"
                      >
                        <div
                          v-if="settings.fb_link"
                          class="icon-content px-2 mobile-menu-icon-social"
                        >
                          <a :href="settings.fb_link"
                            ><i class="fab fa-facebook-f"></i
                          ></a>
                        </div>
                        <div
                          v-if="settings.inst_link"
                          class="icon-content px-2 mobile-menu-icon-social"
                        >
                          <a :href="settings.inst_link"
                            ><i class="fab fa-instagram"></i
                          ></a>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div
                    class="menu-navbar d-flex align-items-center menu-navbar-desktop"
                  >
                    <div
                      class="menu-icon mx-2 d-flex align-items-center position-relative dropdown"
                    >
                      <img
                        v-lazy="`${$baseUrl}assets/front/img/search.svg`"
                        class="img-fluid"
                        alt=""
                        data-toggle="dropdown"
                      />
                      <div
                        class="search-div-menu dropdown-menu"
                        id="search-field-div"
                      >
                        <div class="search-div-menu-container">
                          <div
                            class="search-div-menu-field p-3 position-relative"
                          >
                            <input
                              type="text"
                              name="search"
                              class="search-div-menu-input pr-5 pl-2"
                              placeholder="Wpisz kod lub nazwę produktu"
                              v-model="search"
                              @keyup="searchProduct"
                            />
                            <img
                              :src="`${$baseUrl}assets/front/img/delete.svg`"
                              class="img-fluid m-auto"
                              height="25px"
                              width="auto"
                              style="position:absolute;right: 1.5rem;top:50%;transform: translateY(-50%);background-color: white;"
                              alt="usuń"
                              @click="search = ''"
                            />
                          </div>
                        </div>

                        <div
                          v-if="!searchedProductsLoading"
                          class="searched-products-list"
                        >
                          <router-link
                            :to="{
                              name: 'Product',
                              params: {
                                product_id: product.id,
                                product_name: slug(product.name),
                                category_name: 'roczki',
                              },
                            }"
                            v-for="(product, i) in searchedProducts"
                            :key="`searched-product-${i}`"
                            class="searched-product"
                          >
                            <img
                              class="searched-product-photo"
                              :src="
                                `https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`
                              "
                            />
                            <div class="searched-product-title">
                              {{ product.name }}
                            </div>
                          </router-link>
                        </div>
                        <div
                          v-else
                          class="searched-products-loading px-3 pb-3 pt-0 color-primary"
                        >
                          <div
                            class="spinner-border mx-auto  d-block"
                            role="status"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="!logged"
                      class="menu-icon mx-2 d-flex align-items-center"
                    >
                      <router-link
                        :to="{ name: 'LoginRegister' }"
                        title="Zaloguj się lub zarejestruj"
                      >
                        <img
                          v-lazy="
                            `${$baseUrl}assets/front/img/icons-menu/user_new.svg`
                          "
                          class="img-fluid"
                          alt=""
                        />
                      </router-link>
                    </div>
                    <div
                      v-else
                      class="menu-icon mx-2 d-flex align-items-center dropdown"
                    >
                      <img
                        v-lazy="
                          `${$baseUrl}assets/front/img/icons-menu/user_new.svg`
                        "
                        class="img-fluid account-icon"
                        alt=""
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      />
                      <div
                        class="dropdown-menu drop-buttons"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'MyOrders' }"
                          >Moje zamówienia</router-link
                        >
                        <a
                          v-if="typeAccount === '0'"
                          class="dropdown-item"
                          :href="`${$baseUrl}profil/materialy-marketingowe`"
                          >Mat. marketingowe</a
                        >
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'AccountSettings' }"
                        >
                          Ustawienia konta</router-link
                        >
                        <div class="dropdown-item" @click.prevent="logout">
                          Wyloguj się
                        </div>
                      </div>
                    </div>

                    <div
                      class="menu-icon mx-2 d-flex align-items-center dropdown cart"
                    >
                      <img
                        v-lazy="
                          `${$baseUrl}assets/front/img/icons-menu/percent.svg`
                        "
                        class="img-fluid"
                        alt=""
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        id="discounts"
                      />
                      <div class="dropdown-menu" aria-labelledby="discounts">
                        <input
                          class="discount-div-menu-input"
                          type="text"
                          placeholder="Wprowadź kod"
                        />
                      </div>
                    </div>
                    <div class="menu-icon mx-2 d-flex align-items-center cart">
                      <span id="liked">
                        <router-link
                          :to="{ name: 'FavouriteProducts' }"
                          title="Ulubione produkty"
                        >
                          <div
                            v-if="favouriteProducts.length > 0"
                            class="length_cart"
                          >
                            {{ favouriteProducts.length }}
                          </div>
                          <img
                            v-lazy="
                              `${$baseUrl}assets/front/img/icons-menu/like.svg`
                            "
                            class="img-fluid"
                            alt=""
                          />
                        </router-link>
                      </span>
                    </div>
                    <div
                      class="menu-icon mx-2 d-flex align-items-center dropdown position-relative"
                    >
                      <span data-toggle="dropdown">
                        <div v-if="cart.length > 0" class="length_cart">
                          {{ cart.length }}
                        </div>
                      </span>
                      <img
                        v-lazy="
                          `${$baseUrl}assets/front/img/icons-menu/shopping-bag-new2.svg`
                        "
                        class="img-fluid"
                        alt=""
                        data-toggle="dropdown"
                      />

                      <div class="cart-preview shadow dropdown-menu">
                        <div v-if="cart.length > 0">
                          <div class="table-cart">
                            <div
                              class="table-responsive text-nowrap bg-white rounded"
                            >
                              <table class="table mb-0">
                                <tbody>
                                  <tr
                                    :id="i == 1 ? 'show-new-product' : ''"
                                    v-for="(product, i) in cart"
                                    :key="`menu-cart-product-${i}`"
                                  >
                                    <td class="align-middle">
                                      <router-link
                                        :to="{
                                          name: 'Product',
                                          params: {
                                            product_id: product.id,
                                            product_name: slug(product.name),
                                            category_name: 'roczki',
                                          },
                                        }"
                                      >
                                        <img
                                          :src="
                                            `https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`
                                          "
                                          class="img-fluid"
                                          alt="alt"
                                          style="width: 54px !important;"
                                        />
                                      </router-link>
                                    </td>
                                    <td class="align-middle">
                                      <div>
                                        <small>{{ product.name }}</small
                                        ><br />
                                        <router-link
                                          :to="{
                                            name: 'Product',
                                            params: {
                                              product_id: product.id,
                                              product_name: slug(product.name),
                                              category_name: 'roczki',
                                            },
                                          }"
                                          class="font-weight-bold"
                                        >
                                          {{ product.name }}
                                        </router-link>
                                      </div>
                                    </td>
                                    <td class="align-middle">
                                      <div class="text-cart-preview">
                                        <div class="circle-size mb-0">
                                          {{ product.size }}
                                        </div>
                                        <div>{{ product.qty }} szt.</div>
                                      </div>
                                    </td>
                                    <td class="align-middle">
                                      <div>
                                        CENA<br />
                                        <s v-if="product.price_discount"
                                          ><small
                                            >{{
                                              product.price_discount.toFixed(2)
                                            }}PLN</small
                                          >
                                          <br
                                        /></s>

                                        {{ product.price.toFixed(2) }} PLN
                                      </div>
                                    </td>
                                    <td class="align-middle">
                                      <div>
                                        <a
                                          @click.prevent="
                                            removeProductFromCart(product)
                                          "
                                          class="icon-btn px-0"
                                          ><i class="far fa-trash-alt px-2"></i
                                        ></a>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div
                            class="p-3 bg-white"
                            style="border-top: 1px solid #e2e2e2"
                          >
                            <div class="row align-items-center">
                              <div class="col-6 text-left">
                                <router-link
                                  :to="{ name: 'Cart' }"
                                  class="btn custom-btn p-1 ml-0"
                                  ><span>KOSZYK ></span></router-link
                                >
                              </div>
                              <div
                                v-if="basket.summary"
                                class="col-6 text-right"
                              >
                                Razem:
                                {{ priceFormat(basket.summary.basket_value) }}
                                PLN
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div class="mb-3">Twój koszyk jest pusty</div>
                          <div class="text-cart-preview">
                            Daj się zainspirować i wypełnij go najnowszymi
                            trendami.
                          </div>
                          <div class="text-center mt-3">
                            <router-link
                              :to="{ name: 'Listing' }"
                              class="btn custom-btn ml-0"
                              ><span>SKLEP ></span>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Flags />
                  </div>
                </div>
                <div style="height: 20px;"></div>
              </div>
              <div class="menu-navbar px-1 d-flex menu-navbar-mobile">
                <div
                  class="menu-icon d-flex align-items-center position-relative dropdown"
                >
                  <img
                    v-lazy="`${$baseUrl}assets/front/img/search.svg`"
                    class="img-fluid"
                    alt="Mobile"
                    data-toggle="dropdown"
                  />
                  <div
                    class="search-div-menu dropdown-menu"
                    id="search-field-div-mobile"
                  >
                    <div class="search-div-menu-container">
                      <div
                        class="search-div-menu-field position-relative w-100"
                      >
                        <input
                          type="text"
                          name="search"
                          class="search-div-menu-input pr-5"
                          placeholder="Wpisz kod lub nazwę produktu"
                          v-model="search"
                          @keyup="searchProduct"
                        />
                        <img
                          :src="`${$baseUrl}assets/front/img/delete.svg`"
                          class="img-fluid m-auto"
                          height="25px"
                          width="auto"
                          style="position:absolute;right: 1rem;top:50%;transform: translateY(-50%);background-color: white;"
                          alt="usuń"
                          @click="search = ''"
                        />
                      </div>
                    </div>
                    <div
                      v-if="!searchedProductsLoading"
                      class="searched-products-list"
                    >
                      <router-link
                        :to="{
                          name: 'Product',
                          params: {
                            product_id: product.id,
                            product_name: product.name,
                            category_name: 'roczki',
                          },
                        }"
                        v-for="(product, i) in searchedProducts"
                        :key="`searched-product-${i}`"
                        class="searched-product"
                      >
                        <img
                          class="searched-product-photo"
                          :src="
                            `https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`
                          "
                        />
                        <div class="searched-product-title">
                          {{ product.name }}
                        </div>
                      </router-link>
                    </div>
                    <div
                      v-else
                      class="searched-products-loading px-3 pb-3 pt-3 color-primary"
                    >
                      <div
                        class="spinner-border mx-auto  d-block"
                        role="status"
                      ></div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="!logged"
                  class="menu-icon mx-2 d-flex align-items-center"
                >
                  <router-link
                    :to="{ name: 'LoginRegister' }"
                    title="Zaloguj się lub zarejestruj"
                  >
                    <img
                      v-lazy="
                        `${$baseUrl}assets/front/img/icons-menu/user_new.svg`
                      "
                      class="img-fluid"
                      alt=""
                    />
                  </router-link>
                </div>
                <div
                  v-else
                  class="menu-icon mx-2 d-flex align-items-center dropdown"
                >
                  <img
                    v-lazy="
                      `${$baseUrl}assets/front/img/icons-menu/user_new.svg`
                    "
                    class="img-fluid account-icon"
                    alt=""
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                  <div
                    class="dropdown-menu drop-buttons"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'MyOrders' }"
                      >Moje zamówienia</router-link
                    >
                    <a
                      v-if="typeAccount === '0'"
                      class="dropdown-item"
                      :href="`${$baseUrl}materialy-marketingowe`"
                      >Mat. marketingowe</a
                    >
                    <router-link
                      class="dropdown-item"
                      :to="{ name: 'AccountSettings' }"
                    >
                      Ustawienia konta</router-link
                    >
                    <div class="dropdown-item" @click.prevent="logout">
                      Wyloguj się
                    </div>
                  </div>
                </div>
                <div
                  class="menu-icon px-1 d-flex align-items-center cart dropdown"
                >
                  <img
                    v-lazy="
                      `${$baseUrl}assets/front/img/icons-menu/percent.svg`
                    "
                    class="img-fluid"
                    alt=""
                    id="discount-mobile"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />

                  <div
                    class="dropdown-menu discount-div-menu"
                    aria-labelledby="discount-mobile"
                  >
                    <input
                      class="discount-div-menu-input"
                      type="text"
                      placeholder="Wprowadź kod"
                    />
                  </div>
                </div>
                <div class="menu-icon px-1 d-flex align-items-center cart">
                  <router-link
                    :to="{ name: 'FavouriteProducts' }"
                    title="Ulubione produkty"
                  >
                    <div
                      v-if="favouriteProducts.length > 0"
                      class="length_cart"
                    >
                      {{ favouriteProducts.length }}
                    </div>
                    <img
                      v-lazy="`${$baseUrl}assets/front/img/icons-menu/like.svg`"
                      class="img-fluid"
                      alt=""
                    />
                  </router-link>
                </div>
                <div
                  id="showCartPreview"
                  class="menu-icon px-1 d-flex align-items-center cart dropdown"
                >
                  <router-link :to="cart.length > 0 ? '/koszyk' : '/sklep'">
                    <span id="refreshCart">
                      <div v-if="cart.length > 0" class="length_cart">
                        {{ cart.length }}
                      </div>
                    </span>
                    <img
                      v-lazy="
                        `${$baseUrl}assets/front/img/icons-menu/shopping-bag-new2.svg`
                      "
                      class="img-fluid"
                      alt=""
                    />
                  </router-link>
                </div>

                <Flags />
              </div>
              <button
                :class="['navbar-toggler', 'border_color', 'toggle-button']"
                id="button-menu"
                type="button"
                data-toggle="collapse"
                data-target="#basicExampleNav"
                aria-controls="basicExampleNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                MENU
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Flags from '@/components/layout/Flags';
import slug from '@/helpers/slug/slug';
import cartPost from '@/helpers/cart/cartPost';
import priceFormat from '@/helpers/priceFormat/priceFormat';

export default {
  components: {
    Flags,
  },
  watch: {
    scrollY: {
      immediate: true,
      handler(newValue) {
        this.topNavCollapse = this.scrollY > 250;
      },
    },
  },
  data() {
    return {
      slider: false,
      typeAccount: '1',
      slug,
      scrollY: window.top.scrollY,
      windowWidth: window.innerWidth,
      topNavCollapse: true,
      showCartPreview: false,
      search: '',
      delay: null,
    };
  },
  computed: {
    basket() {
      return this.$store.getters.cart;
    },
    cart() {
      return this.basket?.details ?? [];
    },
    settings() {
      return this.$store.getters.settings;
    },
    poradnikCategory() {
      return this.$store.getters.poradnikCategory;
    },
    session() {
      return this.$store.getters.session;
    },
    searchedProducts() {
      return this.$store.getters.searchedProducts;
    },
    favouriteProducts() {
      return this.$store.getters.favouriteProducts;
    },
    searchedProductsLoading() {
      return this.$store.getters.searchedProductsLoading;
    },
    logged() {
      return Object.keys(this.$store.getters.user).length > 0;
    },
    showCollapse() {
      return this.windowWidth >= 992;
    },
  },
  methods: {
    priceFormat,
    onScroll() {
      this.scrollY = window.top.scrollY;
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    menuButtonClick() {
      this.showCollapse = !this.showCollapse;
    },
    logout() {
      this.$store.dispatch('logout');
    },
    removeProductFromCart(product) {
      cartPost({
        id: product.id,
        item_id: product.item_id,
        pos: product.pos,
        qty: 0,
        size: product.size,
      });
    },

    searchProduct(e) {
      let search = this.search.trim();
      const validKeys = (key) => {
        if (
          (key < 48 || key > 57) &&
          (key < 65 || key > 90) &&
          ![32, 8, 46, 37, 39, 189].includes(key)
        ) {
          return false;
        }
        return true;
      };

      if (!validKeys(e.keyCode)) return;

      if (search.length === 0) this.$store.commit('searchedProducts', []);
      else {
        clearTimeout(this.delay);
        this.delay = setTimeout(
          async () => await this.$store.dispatch('searchedProducts', search),
          500
        );
      }
    },
  },
  created() {
    localStorage.removeItem('search');
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style scoped>
.search-div-menu {
  padding: 0;
}
.searched-products-list {
  max-height: 400px;
  overflow-y: auto;
}
.searched-product:first-child {
  margin-top: 2rem;
}
.searched-product {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 2px solid rgba(0, 0, 0, 0.125);
  transition: background-color 0.2s;
}
.searched-product:last-child {
  border-bottom: 0;
}
.searched-product:hover {
  background-color: var(--first);
  color: white;
}
.searched-product-photo {
  height: 47px;
  padding-right: 1rem;
  width: auto;
}
.searched-product-title {
  font-weight: 700;
  display: flex;
  align-items: center;
}
.color-primary {
  color: var(--first);
}
.table-responsive {
  overflow-x: unset !important;
}
</style>
