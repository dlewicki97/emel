export default {
  state: {
    cartUserDataInvoiceInputs: [],
  },
  getters: {
    cartUserDataInvoiceInputs: (state) => state.cartUserDataInvoiceInputs,
  },
  mutations: {
    cartUserDataInvoiceInputs: (state, cartUserDataInvoiceInputs) =>
      (state.cartUserDataInvoiceInputs = cartUserDataInvoiceInputs),
  },
  actions: {
    cartUserDataInvoiceInputs: async ({ commit, getters }) => {
      await getters.user;

      const user = getters.user;

      commit("cartUserDataInvoiceInputs", [
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          value: user.company_name,
          label: "Nazwa firmy",
          simpleRules: ["required"],
          complexRules: [],
          id: "cartUserDataInvoiceCompany",
          key: "company",
          hurtInput: false,
        },
        {
          valid: false,
          classes: ["col-12", "col-md-6", "text-left", "py-2"],
          value: user.vat_no,
          label: "Nip",
          simpleRules: ["required", "nip"],
          complexRules: [],
          id: "cartUserDataInvoiceNip",
          key: "nip",
          hurtInput: false,
        },
      ]);
    },
  },
};
