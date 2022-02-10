export default {
  state: {
    countryList: [
      { name_pl: "Polska", name_en: "Poland", code: "PL" },
      { name_pl: "Austria", name_en: "Austria", code: "AT" },
      { name_pl: "Belgia", name_en: "Belgium", code: "BE" },
      { name_pl: "Bułgaria", name_en: "Bulgaria", code: "BG" },
      { name_pl: "Czechy", name_en: "Czech Republic", code: "CZ" },
      { name_pl: "Niemcy", name_en: "Germany", code: "DE" },
      { name_pl: "Francja", name_en: "France", code: "FR" },
      { name_pl: "Wielka Brytania", name_en: "United Kingdom", code: "GB" },
      { name_pl: "Irlandia", name_en: "Ireland", code: "IE" },
      { name_pl: "Włochy", name_en: "Italy", code: "IT" },
      { name_pl: "Litwa", name_en: "Lithuania", code: "LT" },
      { name_pl: "Luksemburg", name_en: "Luxembourg", code: "LU" },
      { name_pl: "Holandia", name_en: "Netherlands", code: "NL" },
      { name_pl: "Rumunia", name_en: "Romania", code: "RO" },
      { name_pl: "Szwecja", name_en: "Sweden", code: "SE" },
      { name_pl: "Słowacja", name_en: "Slovakia", code: "SK" },
    ],
  },
  getters: {
    countryList: (state) => state.countryList,
  },
  mutations: {
    countryList: (state, countryList) => (state.countryList = countryList),
  },
  actions: {
    countryList: ({ commit }) => {},
  },
};
