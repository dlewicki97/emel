<template>
  <section class="favourite-products container">
    <div class="orders">
      <h3 class="mb-3">Twoje polubione produkty:</h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col th-md">#</th>
            <th scope="col th-md border-bottom-0">Produkt</th>
            <th scope="col th-md"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in favouriteProducts" :key="`product-${i}`">
            <td scope="row" class="align-middle">{{ i + 1 }}.</td>
            <td class="align-middle d-flex align-items-center flex-wrap ">
              <img
                v-lazy="
                  `https://sbox2.emel.com.pl/img/jpg/250/${product.gfx}.jpg`
                "
                class="mr-2"
                alt=""
                width="32"
              />
              {{ product.name }}
            </td>
            <td class="align-middle ">
              <router-link
                class="pr-0 pr-sm-3"
                :to="{
                  name: 'Product',
                  params: {
                    product_id: product.id,
                    product_name: slug(product.name),
                    category_name: '-',
                  },
                }"
                title="Przejdź do produktu"
                ><i class="fas fa-sign-in-alt"></i
              ></router-link>
              <br class="d-block d-sm-none" />
              <a
                @click.prevent="removeFromFavourites(product.data)"
                title="Usuń z ulubionych"
                ><i class="fas fa-trash"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
      <h4 class="favourites-empty" v-if="favouriteProducts.length == 0">
        Brak produktów w ulubionych! Dodaj je w zakładce
        <router-link :to="{ name: 'Listing' }">Sklep</router-link>
      </h4>
    </div>
  </section>
</template>

<script>
import slug from "@/helpers/slug/slug";
import removeFromFavourites from "@/helpers/favourites/removeFromFavourites";

export default {
  methods: {
    slug,
    removeFromFavourites,
  },
  computed: {
    favouriteProducts() {
      return this.$store.getters.favouriteProducts;
    },
  },
};
</script>

<style scoped>
.favourites-empty a {
  font-size: 1.5rem;
  color: var(--first);
}
.table thead th {
  border-bottom: 0;
}
.table td,
.table th {
  border-top: 0;
}
.table :is(tbody tr:not(:last-child), thead tr) {
  border-bottom: 1px solid #dee2e6;
}
</style>
