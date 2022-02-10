<template>
  <section class="add-address-form">
    <label class="text-uppercase mb-0">Adres</label>
    <input
      type="text"
      class="form-control"
      v-model="userAddress.address_line_1"
    />
    <label class="text-uppercase mb-0">Kod pocztowy</label>
    <input type="text" class="form-control" v-model="userAddress.zip" />
    <label class="text-uppercase mb-0">Miasto</label>
    <input type="text" class="form-control" v-model="userAddress.city" />
    <label class="text-uppercase mb-0">Kraj</label>
    <select class="form-control d-block" v-model="userAddress.country">
      <option disabled>Wybierz swój kraj</option>
      <option
        v-for="(country, i) in countryList"
        :key="i"
        :value="country.code"
        :selected="country.code === 'PL'"
      >
        {{ country.name_pl }}
      </option>
    </select>

    <button
      id="submitFormBtn"
      class="custom-btn checkout-btn w-100 mt-3"
      @click.prevent="addressForm"
    >
      <span
        >{{ editAction ? 'Zapisz' : 'Dodaj'
        }}<i :class="`fas fa-${editAction ? 'pencil-alt' : 'plus'} pl-2`"></i
      ></span>
    </button>
    <button
      id="submitFormBtn"
      class="custom-btn checkout-btn w-100 mt-2"
      @click.prevent="$emit('close')"
    >
      <span>Anuluj<i class="fas fa-minus pl-2"></i></span>
    </button>
  </section>
</template>

<script>
import statusesKeys from '@/helpers/alertBox/statusesKeys';
import saveAddresses from '@/helpers/accountSettings/saveAddresses';

export default {
  props: ['editIndex'],
  data() {
    return {
      userAddress: {
        address_line_1: '',
        zip: '',
        city: '',
        country: 'PL',
      },
    };
  },
  computed: {
    countryList() {
      return this.$store.getters.countryList;
    },
    userAddresses() {
      return this.$store.getters.userAddresses;
    },
    editAction() {
      return this.editIndex >= 0;
    },
    user() {
      return this.$store.getters.user;
    },
    userLogged() {
      return Object.entries(this.user).length > 0;
    },
  },
  methods: {
    async addressForm() {
      let fields = [];
      if (this.userAddress.address_line_1.trim() == '') fields.push('Adres');
      if (this.userAddress.zip.trim() == '') fields.push('Kod pocztowy');
      if (this.userAddress.city.trim() == '') fields.push('Miasto');

      if (fields.length > 0) {
        this.$store.commit('alertBox', {
          status: statusesKeys.error,
          message: `Proszę uzupełnić pola: ${fields.join(', ')}`,
        });
        return;
      }
      if (!this.userLogged) {
        let newUserAddresses = this.userAddresses;
        if (this.editAction)
          newUserAddresses.splice(this.editIndex, 1, this.userAddress);
        else newUserAddresses = [...this.userAddresses, this.userAddress];

        this.$store.commit('userAddresses', newUserAddresses);
        localStorage.setItem('userAddresses', JSON.stringify(newUserAddresses));
      } else {
        await saveAddresses([this.userAddress]);
      }

      this.$emit('close');
    },
  },
  created() {
    if (this.editAction) this.userAddress = this.userAddresses[this.editIndex];
  },
};
</script>
