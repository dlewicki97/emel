<template>
  <section class="container-fluid orders">
    <h3 class="mb-3">Twoje zamówienia:</h3>
    <table class="table table-responsive">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Data</th>
          <th scope="col">Status</th>
          <th scope="col">Kwota</th>
          <th scope="col">Ilość</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody id="tbody">
        <tr v-for="(order, i) in myOrders" :key="i">
          <th scope="row">{{ i + 1 }}.</th>
          <td>19:09 12/02/2021</td>
          <td>Wysłane</td>
          <td>219.00 PLN</td>
          <td>
            1 szt.
          </td>
          <td class="d-flex">
            <router-link
              :to="{ name: 'OrderDetails', params: { order_id: order.id } }"
              title="Szczegóły zamówienia"
              class="btn btn-info-custom"
              >Szczegóły zamówienia</router-link
            >

            <a
              v-if="order.complainted"
              :href="`${$baseUrl}drukuj/reklamacja/${order.id}`"
              title="Reklamacja zamówienia - druk"
              class="ml-3 btn btn-info-custom"
              target="_blank"
            >
              Reklamacja - drukuj
            </a>
            <a
              v-else
              :href="`${$baseUrl}reklamacja/${order.id}`"
              title="Reklamacja zamówienia"
              class="ml-3 btn btn-info-custom"
              >Reklamacja</a
            >
            <a
              v-if="order.returned"
              :href="`${$baseUrl}drukuj/zwrot/${order.id}`"
              title="Zwrot zamówienia - druk"
              class="ml-3 btn btn-info-custom"
              target="_blank"
            >
              Zwrot - drukuj
            </a>
            <a
              v-else
              :href="`${$baseUrl}zwrot/${order.id}`"
              title="Zwrot zamówienia"
              class="ml-3 btn btn-info-custom"
              >Zwrot</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  computed: {
    myOrders() {
      return this.$store.getters.myOrders;
    },
  },
};
</script>
