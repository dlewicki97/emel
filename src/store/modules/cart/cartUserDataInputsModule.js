export default {
  state: {
    cartUserDataInputs: [],
  },
  getters: {
    cartUserDataInputs: (state) => state.cartUserDataInputs,
  },
  mutations: {
    cartUserDataInputs: (state, cartUserDataInputs) =>
      (state.cartUserDataInputs = cartUserDataInputs),
  },
  actions: {
    cartUserDataInputs: async ({ commit, getters }) => {
      await getters.user;

      const user = getters.user;

      commit('cartUserDataInputs', [
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.customer_name ?? '',
          label: 'Imię',
          simpleRules: ['required'],
          complexRules: [],
          id: 'cartUserDataFirstName',
          key: 'firstName',
          hurtInput: false,
        },
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.customer_surname ?? '',
          label: 'Nazwisko',
          simpleRules: ['required'],
          complexRules: [],
          id: 'cartUserDataLastName',
          key: 'lastName',
          hurtInput: false,
        },
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.email ?? '',
          label: 'E-mail',
          simpleRules: ['required', 'email'],
          complexRules: [],
          id: 'cartUserDataEmail',
          key: 'email',
          hurtInput: false,
        },
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.phone ?? '',
          label: 'Telefon',
          simpleRules: ['required'],
          complexRules: [],
          id: 'cartUserDataPhone',
          key: 'phone',
          hurtInput: false,
        },
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.customer_name ?? '',
          label: 'Imię',
          simpleRules: ['required'],
          complexRules: [],
          id: 'cartUserDataOtherAddressFirstName',
          key: 'otherAddressFirstName',
          hurtInput: false,
          otherAddress: true,
        },
        {
          valid: false,
          classes: ['col-12', 'col-md-6', 'text-left', 'py-2'],
          value: user.customer_surname ?? '',
          label: 'Nazwisko',
          simpleRules: ['required'],
          complexRules: [],
          id: 'cartUserDataOtherAddressLastName',
          key: 'otherAddressLastName',
          hurtInput: false,
          otherAddress: true,
        },

        {
          valid: false,
          classes: ['col-12', 'text-left', 'py-2'],
          value: '',
          label: 'Uwagi do zamówienia',
          simpleRules: [],
          complexRules: [],
          id: 'cartUserDataMessage',
          key: 'message',
          hurtInput: false,
          type: 'textarea',
        },
      ]);
    },
  },
};
