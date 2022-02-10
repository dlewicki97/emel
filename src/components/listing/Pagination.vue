<template>
  <div class="row justify-content-center paging pt-4 mb-3 mb-lg-0">
    <router-link :to="getRedirectData(1)" v-if="currentPage > 1">
      <i class="fa fa-angle-double-left" aria-hidden="true"></i>
    </router-link>
    <router-link :to="getRedirectData(currentPage - 1)" v-if="currentPage > 1">
      <i class="fas fa-chevron-left" aria-hidden="true"></i>
    </router-link>
    <router-link
      :to="getRedirectData(currentPage - 2)"
      v-if="currentPage >= 3"
      >{{ currentPage - 2 }}</router-link
    >
    <router-link
      :to="getRedirectData(currentPage - 1)"
      v-if="currentPage >= 2"
      >{{ currentPage - 1 }}</router-link
    >
    <strong>{{ currentPage }}</strong>
    <router-link
      :to="getRedirectData(currentPage + 1)"
      v-if="currentPage <= listingMeta.totalPages - 1"
    >
      {{ currentPage + 1 }}
    </router-link>
    <router-link
      :to="getRedirectData(currentPage + 2)"
      v-if="currentPage <= listingMeta.totalPages - 2"
    >
      {{ currentPage + 2 }}
    </router-link>
    <router-link
      :to="getRedirectData(currentPage + 1)"
      v-if="currentPage < listingMeta.totalPages"
    >
      <i class="fas fa-chevron-right" aria-hidden="true"></i>
    </router-link>
    <router-link
      :to="getRedirectData(listingMeta.totalPages)"
      v-if="currentPage < listingMeta.totalPages"
    >
      <i class="fa fa-angle-double-right" aria-hidden="true"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  computed: {
    currentPage() {
      return +this.$route.params.page || 1;
    },
    listingMeta() {
      return this.$store.getters.listingMeta;
    },
  },
  methods: {
    getRedirectData(page) {
      return {
        name: this.$route.params.category_id
          ? "ListingCategoryPage"
          : "ListingPage",
        params: {
          page,
        },
      };
    },
  },
};
</script>
