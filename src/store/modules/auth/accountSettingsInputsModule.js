export default {
  state: {
    accountSettingsInputs: [],
  },

  getters: {
    accountSettingsInputs: (state) => state.accountSettingsInputs,
  },

  mutations: {
    accountSettingsInputs: (state, accountSettingsInputs) =>
      (state.accountSettingsInputs = accountSettingsInputs),
  },

  actions: {
    accountSettingsInputs: async ({ commit, getters }) => {
      await getters.user;

      const user = getters.user;

      commit("accountSettingsInputs", [
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "Imię*",
          simpleRules: ["required"],
          complexRules: [],
          id: "accountSettingsFirstName",
          key: "customer_name",
          value: user.customer_name,
        },
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "Nazwisko*",
          simpleRules: ["required"],
          complexRules: [],
          id: "accountSettingsLastName",
          key: "customer_surname",
          value: user.customer_surname,
        },
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "E-mail*",
          simpleRules: ["required", "email"],
          complexRules: [],
          id: "accountSettingsEmail",
          key: "email",
          value: user.email,
        },

        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "Telefon*",
          simpleRules: ["required", "phone"],
          complexRules: [],
          id: "accountSettingsPhone",
          key: "phone",
          value: user.phone,
        },
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "Nazwa firmy",
          simpleRules: [],
          complexRules: [],
          id: "accountSettingsCompany",
          key: "company_name",
          hurtInput: false,
          value: user.company_name,
        },
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          label: "NIP",
          simpleRules: ["nip"],
          complexRules: [],
          id: "accountSettingsNip",
          key: "vat_no",
          hurtInput: false,
          value: user.vat_no,
        },
      ]);
    },
  },
};
