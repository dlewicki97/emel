<template>
  <section class="account-settings container login-form">
    <h3 class="mb-3">Ustawienia konta:</h3>
    <form>
      <div class="row">
        <Input
          v-for="input in inputs"
          :key="input.id"
          ref="accountSettingsInputs"
          :classes="input.classes"
          :label="input.label"
          :simpleRules="input.simpleRules"
          :id="input.id"
          @value="updateAccountSettingsData(input.key, $event)"
          :hr="input.hr"
          :type="input.type"
          :value="input.value"
        />

        <div class="col-12 text-center py-2 mt-3">
          <button
            @click.prevent="saveAccountSettings"
            class="custom-btn text-uppercase font-weight-bold p-2"
          >
            <span>Zapisz dane użytkownika</span>
          </button>
        </div>
        <button @click.prevent="addAddress" class="btn add-address col-12 mt-5">
          Dodaj Adres
        </button>

        <div
          v-for="(address, i) in userAddresses"
          :key="`userAddress-${i}`"
          class="address col-12 mt-5"
        >
          <div class="d-flex align-items-center w-100 justify-content-between">
            <h4>Adres #{{ getAddressIndex(i) }}</h4>
            <button
              v-if="address.status != 257"
              @click.prevent="deleteAddress(i)"
              class="btn btn-sm delete-address"
            >
              Usuń
            </button>
          </div>
          <div class="d-flex flex-wrap">
            <Input
              v-for="(input, j) in addressInputs"
              :key="`${input.id}-${i}`"
              ref="addressInputs"
              :classes="input.classes"
              :label="input.label"
              :simpleRules="input.simpleRules"
              :id="`${input.id}-${i}`"
              @value="updateAddress(input.key, $event, i)"
              :hr="input.hr"
              :type="input.type"
              :value="userAddresses[i][input.key]"
              addressInput
            />
          </div>
        </div>

        <div class="col-12 text-center py-2 mt-3">
          <button
            @click.prevent="saveAddresses"
            class="custom-btn text-uppercase font-weight-bold p-2"
          >
            <span>Zapisz Adresy</span>
          </button>
        </div>
      </div>
    </form>

    <a class="delete-account" @click.prevent="deleteAccount">Usuń konto</a>
  </section>
</template>

<script>
import Input from "@/components/forms/Input";
import addressInputs from "@/helpers/accountSettings/addressInputs";
import formValidate from "@/helpers/validation/formValidate";
import updateUserData from "@/helpers/accountSettings/updateUserData";
import saveAddresses from "@/helpers/accountSettings/saveAddresses";
import deleteAddress from "@/helpers/accountSettings/deleteAddress";
import deleteAccount from "@/helpers/accountSettings/deleteAccount";

export default {
  data() {
    return {
      accountSettings: {},
      addressInputs,
      deletedAddressesIndexes: [],
    };
  },
  components: {
    Input,
  },
  computed: {
    inputs() {
      return this.$store.getters.accountSettingsInputs.filter(
        (input) => input.addressInput === undefined
      );
    },
    user() {
      return this.$store.getters.user;
    },
    userAddresses() {
      return this.$store.getters.userAddresses.filter(
        (_, i) => !this.isAddressDeleted(i)
      );
    },
  },
  methods: {
    formValidate,
    getAddressIndex(index) {
      return (
        index +
        this.deletedAddressesIndexes.reduce(
          (total, deletedIndex) => (index >= deletedIndex ? --total : total),
          1
        )
      );
    },
    updateAccountSettingsData(key, value) {
      this.accountSettings[key] = value;
    },
    createAccountSettingsDataFields() {
      this.inputs.forEach(
        (input) => (this.accountSettings[input.key] = input.value)
      );
    },
    addAddress() {
      let userAddresses = this.userAddresses;
      userAddresses.push({
        address_line_1: "",
        address_line_2: "",
        city: "",
        country: "",
        status: 2,
        zip: "",
      });
      this.$store.commit("userAddresses", userAddresses);
    },
    updateAddress(key, value, addressIndex) {
      let userAddresses = this.userAddresses;
      userAddresses[addressIndex][key] = value;
      this.$store.commit("userAddresses", userAddresses);
    },
    deleteAddress(index) {
      let userAddresses = this.userAddresses;

      const addressId = this.userAddresses[index].customer_address_id;

      if (addressId) deleteAddress(addressId);
      delete this.userAddresses[index];
      this.deletedAddressesIndexes.push(index);
      this.$store.commit("userAddresses", userAddresses);
    },
    saveAccountSettings() {
      if (!this.formValidate(this.$refs.accountSettingsInputs)) return;
      updateUserData(this.accountSettings);
    },
    saveAddresses() {
      if (!this.formValidate(this.$refs.addressInputs)) return;
      saveAddresses(this.userAddresses);
    },
    isAddressDeleted(index) {
      return this.deletedAddressesIndexes.includes(index);
    },
    deleteAccount,
  },
  created() {
    this.createAccountSettingsDataFields();
    this.$store.dispatch("userAddresses");
    this.$store.dispatch("accountSettingsInputs");
  },
};
</script>

<style scoped>
button:is(.add-address, .delete-address) {
  color: white;
  font-weight: 700;
}

.add-address {
  background-color: var(--success);
}

.delete-address {
  background-color: var(--first);
}

.delete-account {
  width: 100%;
  text-align: center;
  display: block;
  color: lightgray !important;
  text-decoration: underline !important;
  margin-top: 3rem;
}
</style>
