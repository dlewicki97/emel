<template>
  <section class="cart-user-data container">
    <div class="tabs">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li @click="invoice = false" class="nav-item">
          <a
            :class="['nav-link', { active: !invoice }]"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            :aria-selected="invoice"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                v-model="invoice"
                type="radio"
                class="custom-control-input"
                id="defaultInline1"
                value="0"
              />
              <label
                class="custom-control-label text-uppercase"
                for="defaultInline1"
                >paragon</label
              >
            </div>
          </a>
        </li>
        <li @click="invoice = true" class="nav-item">
          <a
            :class="['nav-link', { active: invoice }]"
            id="invoice-tab"
            data-toggle="tab"
            href="#invoice"
            role="tab"
            aria-controls="invoice"
            :aria-selected="invoice"
          >
            <div class="custom-control custom-radio custom-control-inline">
              <input
                v-model="invoice"
                type="radio"
                class="custom-control-input"
                id="defaultInline2"
                value="1"
              />
              <label
                class="custom-control-label text-uppercase"
                for="defaultInline2"
                >faktura</label
              >
            </div>
          </a>
        </li>
      </ul>

      <div class="tab-content p-0 pt-5" id="myTabContent">
        <div
          :class="[
            'tab-pane',
            'fade',
            { show: !invoice },
            { active: !invoice },
          ]"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <form id="paragonForm">
            <div
              class="tab-content receipt-tab-content p-0"
              id="myTabContentMD"
            >
              <div
                class="tab-pane fade show active"
                id="receipt_yes"
                role="tabpanel"
                aria-labelledby="receipt-tab_yes"
              ></div>
              <div
                class="tab-pane fade"
                id="receipt_no"
                role="tabpanel"
                aria-labelledby="receipt-tab_no"
              ></div>
            </div>
          </form>
        </div>
        <div
          :class="['tab-pane', 'fade', { show: invoice }, { active: invoice }]"
          id="invoice"
          role="tabpanel"
          aria-labelledby="invoice-tab"
        >
          <form id="fakturaForm">
            <div class="checkout-box">
              <div class="checkout-header p-4">
                <h2 class="text-uppercase font-weight-bold">dane do faktury</h2>
              </div>
              <div class="d-flex flex-wrap">
                <div class="details-form">
                  <div
                    class="text-center pt-xl-5 pt-2 pl-xl-5 pl-2 pr-xl-5 pr-2 pb-5"
                  >
                    <div class="row">
                      <Input
                        v-for="input in cartUserDataInvoiceInputs"
                        :key="input.id"
                        :hurtInput="input.hurtInput"
                        ref="input"
                        :classes="input.classes"
                        :label="input.label"
                        :simpleRules="input.simpleRules"
                        :complexRules="input.complexRules"
                        :id="input.id"
                        @value="updateCartUserData(input.key, $event)"
                        :hr="input.hr"
                        :value="input.value"
                        :type="input.type"
                        :pattern="input.pattern"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="tab-content invoice-tab-content p-0"
                id="myTabContentMD"
              >
                <div
                  class="tab-pane fade show active"
                  id="invoice_yes"
                  role="tabpanel"
                  aria-labelledby="invoice-tab_yes"
                ></div>
                <div
                  class="tab-pane fade"
                  id="invoice_no"
                  role="tabpanel"
                  aria-labelledby="invoice-tab_no"
                ></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="checkout-box">
        <div class="checkout-header p-4">
          <h2 class="text-uppercase font-weight-bold">
            dane zamawiającego
          </h2>
        </div>
        <div class="d-flex flex-wrap">
          <div class="details-form">
            <div class="text-center py-xl-5 pt-2 pl-xl-5 pl-2 pr-xl-5 pr-2">
              <div class="row">
                <Input
                  :hurtInput="input.hurtInput"
                  ref="input"
                  v-for="input in cartUserDataInputs"
                  :key="input.id"
                  :classes="input.classes"
                  :label="input.label"
                  :simpleRules="input.simpleRules"
                  :complexRules="input.complexRules"
                  :id="input.id"
                  @value="updateCartUserData(input.key, $event)"
                  :hr="input.hr"
                  :value="input.value"
                  :type="input.type"
                  :pattern="input.pattern"
                />
              </div>
              <div
                class="d-flex py-3 content-column text-left align-items-center"
              >
                <p class="pr-3 m-0">Dostawa na inny adres</p>
                <ul class="nav nav-tabs" id="myTabMD" role="tablist">
                  <li
                    @click="otherAddress = true"
                    class="nav-item other-address-yes"
                  >
                    <a
                      :class="['nav-link', { active: otherAddress }]"
                      id="receipt-tab_yes"
                      data-toggle="tab"
                      href="#receipt_yes"
                      role="tab"
                      aria-controls="receipt_yes"
                      :aria-selected="otherAddress"
                    >
                      <div
                        class="custom-control custom-radio custom-control-inline"
                      >
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="defaultInline3"
                          v-model="otherAddress"
                          value="1"
                        />
                        <label
                          class="custom-control-label text-uppercase"
                          for="defaultInline3"
                          >tak</label
                        >
                      </div>
                    </a>
                  </li>
                  <li
                    @click="otherAddress = false"
                    class="nav-item other-address-no"
                  >
                    <a
                      :class="['nav-link', { active: !otherAddress }]"
                      id="receipt-tab_no"
                      data-toggle="tab"
                      href="#receipt_no"
                      role="tab"
                      aria-controls="receipt_no"
                      :aria-selected="otherAddress"
                    >
                      <div
                        class="custom-control custom-radio custom-control-inline"
                      >
                        <input
                          type="radio"
                          class="custom-control-input"
                          id="defaultInline4"
                          value="0"
                          v-model="otherAddress"
                        />
                        <label
                          class="custom-control-label text-uppercase"
                          for="defaultInline4"
                          >nie</label
                        >
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="row">
                <Input
                  :hurtInput="input.hurtInput"
                  ref="input"
                  v-for="input in cartUserDataOtherAddressInputs"
                  :key="input.id"
                  :classes="input.classes"
                  :label="input.label"
                  :simpleRules="input.simpleRules"
                  :complexRules="input.complexRules"
                  :id="input.id"
                  @value="updateCartUserData(input.key, $event)"
                  :hr="input.hr"
                  :value="input.value"
                  :type="input.type"
                  :pattern="input.pattern"
                />
              </div>
            </div>
          </div>
          <div class="user-addresses-column">
            <div class="user-addresses">
              <h5>Wybierz adres:</h5>
              <u @click="addressForm"> Dodaj adres</u>
              <AddressForm
                v-if="addressFormAction"
                @close="closeAddressForm"
                :editIndex="editUserAddressIndex"
              />
              <ul
                v-else
                @click="addressId = i"
                v-for="(address, i) in userAddresses"
                :key="`user-address-${i}`"
                :class="[
                  'user-address',
                  {
                    active: addressId == i,
                  },
                ]"
              >
                <i
                  @click.stop="editAddress(i)"
                  class="fas fa-pencil-alt edit"
                ></i>
                <i
                  @click.stop="deleteAddress(i)"
                  class="fas fa-trash delete"
                ></i>
                <li><span>Adres:</span> {{ address.address_line_1 }}</li>
                <li><span>Kod pocztowy:</span> {{ address.zip }}</li>
                <li><span>Miasto:</span> {{ address.city }}</li>
                <li>
                  <span>Kraj:</span> {{ getCountryNameByCode(address.country) }}
                </li>
              </ul>
            </div>
            <div
              v-if="otherAddress && !addressFormAction"
              class="user-addresses"
            >
              <h5>Wybierz adres dostawy:</h5>
              <ul
                @click="otherAddressId = i"
                v-for="(address, i) in userAddresses"
                :key="`user-address-${i}`"
                :class="[
                  'user-address',
                  {
                    active: otherAddressId == i,
                  },
                ]"
              >
                <i
                  @click.stop="editAddress(i)"
                  class="fas fa-pencil-alt edit"
                ></i>
                <i
                  @click.stop="deleteAddress(i)"
                  class="fas fa-trash delete"
                ></i>
                <li><span>Adres:</span> {{ address.address_line_1 }}</li>
                <li><span>Kod pocztowy:</span> {{ address.zip }}</li>
                <li><span>Miasto:</span> {{ address.city }}</li>
                <li>
                  <span>Kraj:</span> {{ getCountryNameByCode(address.country) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Input from '@/components/forms/Input';
import AddressForm from '@/components/cart/AddressForm';
import formValidate from '@/helpers/validation/formValidate';
import deleteAddress from '@/helpers/accountSettings/deleteAddress';

export default {
  data() {
    return {
      invoice: false,
      cartUserData: {},
      addressId: -1,
      otherAddressId: -1,
      otherAddress: false,
      addressFormAction: false,
      editUserAddressIndex: -1,
    };
  },
  components: {
    Input,
    AddressForm,
  },
  watch: {
    user: {
      deep: true,
      immediate: true,
      handler() {
        if (this.userLogged) {
          this.$store.dispatch('cartUserDataInputs');
          this.$store.dispatch('cartUserDataInvoiceInputs');
          this.$store.dispatch('userAddresses');
        }
      },
    },
  },
  computed: {
    cartUserDataOtherAddressInputs() {
      return this.otherAddress
        ? this.$store.getters.cartUserDataInputs.filter(
            (input) => input.otherAddress
          )
        : [];
    },
    cartUserDataInputs() {
      return this.invoice
        ? this.$store.getters.cartUserDataInputs.filter(
            (input) =>
              !['firstName', 'lastName'].includes(input.key) &&
              !input.otherAddress
          )
        : this.$store.getters.cartUserDataInputs.filter(
            (input) => !input.otherAddress
          );
    },
    cartUserDataInvoiceInputs() {
      return this.invoice ? this.$store.getters.cartUserDataInvoiceInputs : [];
    },
    userAddresses() {
      return this.$store.getters.userAddresses;
    },
    countryList() {
      return this.$store.getters.countryList;
    },
    user() {
      return this.$store.getters.user;
    },
    userLogged() {
      return Object.entries(this.user).length > 0;
    },
  },
  methods: {
    saveOrderData() {
      let addressIndex = this.addressId;
      let shippingAddressIndex = this.otherAddressId;

      let address = this.userAddresses[addressIndex];
      let shippingAddress =
        shippingAddressIndex == -1
          ? address
          : this.userAddresses[shippingAddressIndex];

      let orderData = JSON.parse(localStorage.getItem('orderData'));

      localStorage.setItem(
        'orderData',
        JSON.stringify(
          Object.assign(orderData, {
            billing: {
              name: this.invoice
                ? this.cartUserData.company
                : this.cartUserData.firstName +
                  ' ' +
                  this.cartUserData.lastName,
              address: address.address_line_1,
              zip: address.zip,
              city: address.city,
              country: address.country,
              vat_no: this.invoice ? this.cartUserData.nip : '',
            },
            shipping: {
              name: this.invoice
                ? this.otherAddressId
                  ? this.cartUserData.otherAddressFirstName +
                    ' ' +
                    this.cartUserData.otherAddressLastName
                  : this.cartUserData.company
                : this.cartUserData[
                    this.otherAddress ? 'otherAddressFirstName' : 'firstName'
                  ] +
                  ' ' +
                  this.cartUserData[
                    this.otherAddress ? 'otherAddressLastName' : 'lastName'
                  ],
              address: shippingAddress.address_line_1,
              zip: shippingAddress.zip,
              city: shippingAddress.city,
              country: shippingAddress.country,
              phone: this.cartUserData['phone'],
              email: this.cartUserData.email,
            },
          })
        )
      );
    },
    formValidate() {
      return formValidate(this.$refs.input);
    },
    updateCartUserData(key, value) {
      this.cartUserData[key] = value;
    },
    fillCartUserData() {
      this.cartUserDataInputs.forEach(
        (input) => (this.cartUserData[input.key] = input.value)
      );
    },
    getCountryNameByCode(code) {
      return this.countryList.find((country) => country.code == code).name_pl;
    },
    addressForm() {
      this.addressFormAction = true;
    },
    editAddress(index) {
      this.addressForm();
      this.editUserAddressIndex = index;
    },
    deleteAddress(index) {
      if (this.userLogged) {
        deleteAddress(this.userAddresses[index].customer_address_id);
      } else {
        if (!confirm('Czy na pewno usunąć ten adres?')) return;
        let newUserAddresses = this.userAddresses;
        newUserAddresses.splice(index, 1);
        this.$store.commit('userAddresses', newUserAddresses);
        localStorage.setItem('userAddresses', JSON.stringify(newUserAddresses));
      }
    },
    closeAddressForm() {
      this.editUserAddressIndex = -1;
      this.addressFormAction = false;
    },
    fetchCartUserDataFromLocalStorage() {
      let orderData = JSON.parse(localStorage.getItem('orderData'));
      if (!orderData.billing) return;
      let cartUserDataInputs = this.$store.getters.cartUserDataInputs;
      cartUserDataInputs.find(
        (input) => input.key == 'firstName'
      ).value = orderData.billing.name.split(' ')[0];
      cartUserDataInputs.find(
        (input) => input.key == 'lastName'
      ).value = orderData.billing.name.split(' ')[1];
      cartUserDataInputs.find((input) => input.key == 'email').value =
        orderData.shipping.email;
      cartUserDataInputs.find((input) => input.key == 'phone').value =
        orderData.shipping.phone;

      let addressLine = orderData.billing.address;
      let addressZip = orderData.billing.zip;
      let otherAddressLine = orderData.shipping.address;
      let otherAddressZip = orderData.shipping.zip;

      let choosedUserAddress = this.userAddresses.findIndex(
        (address) =>
          address.address_line_1 == addressLine && address.zip == addressZip
      );

      this.addressId = choosedUserAddress;

      if (addressLine != otherAddressLine) {
        this.otherAddress = true;
      }

      if (this.otherAddress) {
        cartUserDataInputs.find(
          (input) => input.key == 'otherAddressFirstName'
        ).value = orderData.shipping.name.split(' ')[0];
        cartUserDataInputs.find(
          (input) => input.key == 'otherAddressLastName'
        ).value = orderData.shipping.name.split(' ')[1];

        let choosedOtherUserAddress = this.userAddresses[
          this.userLogged ? 'find' : 'findIndex'
        ](
          (address) =>
            address.address_line_1 == otherAddressLine &&
            address.zip == otherAddressZip
        );

        if (this.userLogged)
          choosedOtherUserAddress =
            choosedOtherUserAddress?.customer_address_id;

        this.otherAddressId = choosedOtherUserAddress;
      }

      if (orderData.billing.vat_no != '') {
        this.invoice = true;
        let cartUserDataInvoiceInputs = this.$store.getters
          .cartUserDataInvoiceInputs;
        cartUserDataInvoiceInputs.find(
          (input) => input.key == 'company'
        ).value = orderData.billing.name;
        cartUserDataInvoiceInputs.find((input) => input.key == 'nip').value =
          orderData.billing.vat_no;
      }
    },
  },
  async created() {
    this.fillCartUserData();
    this.$store.dispatch('cartUserDataInputs');
    await this.$store.dispatch('cartUserDataInvoiceInputs');
    if (this.userLogged) this.$store.dispatch('userAddresses');
    else
      this.$store.commit(
        'userAddresses',
        JSON.parse(localStorage.getItem('userAddresses')) ?? []
      );

    this.fetchCartUserDataFromLocalStorage();
  },
};
</script>

<style scoped lang="scss">
.details-form {
  @media (max-width: 992px) {
    width: 100%;
  }
}
.user-addresses-column {
  width: 40%;
  @media (max-width: 992px) {
    width: 100%;
  }
  .user-addresses {
    padding: 3rem;
    @media (max-width: 992px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    &:not(:first-child) {
      padding-top: 0;
    }
    h5 {
      margin-bottom: 0.1rem;
    }
    u {
      margin-bottom: 1rem;
      display: block;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .user-address {
      padding-left: 0;
      list-style-type: none;
      border: 3px solid black;
      padding: 0.5rem;
      cursor: pointer;
      position: relative;
      .edit,
      .delete {
        position: absolute;
        top: 15px;
        right: 15px;
        height: 15px;
        opacity: 0;
        transition: 0.2s opacity;
      }
      .edit {
        right: 40px;
      }
      &:hover {
        .edit,
        .delete {
          opacity: 1;
        }
      }
      &.active {
        border-color: var(--success);
      }
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
