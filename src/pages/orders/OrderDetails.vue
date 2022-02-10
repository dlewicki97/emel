<template>
  <section class="container-fluid order-details">
    <CartSummary :orderId="$route.params.order_id" />
  </section>
</template>

<script>
import CartSummary from "@/pages/cart/CartSummary";

export default {
  components: {
    CartSummary,
  },
  created() {
    this.$store.commit(
      "metaTitle",
      `Szczegóły zamówienia #${this.$route.params.order_id}`
    );
  },
};
</script>

<style lang="scss" scoped>
section.order-details {
  margin-top: 10rem;
}
</style>
