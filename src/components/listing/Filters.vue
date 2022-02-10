<template>
  <section class="filters pt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-sorting-box">
          <div
            :class="[
              'sorting-box',
              'align-items-center',
              'list-column',
              'pb-lg-0',
              'pb-3',
              'collapse',
              'navbar-collapse',
              { show: mobileFilters },
            ]"
            id="navbarNavFilters"
          >
            <div class="container-box text-center m-auto ml-lg-0 ">
              <div class="text-uppercase font-weight-bold">Filtruj według</div>
              <div class="sorting-box-container">
                <div
                  :class="['dropdown', { show: dropdowns.sizes }]"
                  v-if="!isSocks && minSize != 0 && maxSize != 0"
                >
                  <a
                    @click="setDropdown('sizes')"
                    class="btn dropdown-toggle text-uppercase pr-0"
                    type="button"
                  >
                    rozmiar{{ getSessionSize() }}
                  </a>
                  <span
                    v-if="sizes.size > 0"
                    class="badge badge-danger mx-auto"
                    style="margin-left: 1rem!important;"
                    @click="clearFilter('sizes', new Set())"
                  >
                    <i class="fas fa-times"></i>
                  </span>
                  <div
                    :class="[
                      'dropdown-menu',
                      'dropdown-primary',
                      'size-table',
                      { show: dropdowns.sizes },
                    ]"
                    aria-labelledby="sizes"
                  >
                    <div class="d-flex justify-content-center">
                      <ul
                        v-for="(list, i) in sizesList"
                        :key="i"
                        :class="[{ 'border-right': i < sizesList.length - 1 }]"
                      >
                        <li
                          @click="setSizes(size)"
                          v-for="(size, j) in sizesList[i]"
                          :key="j"
                        >
                          <a
                            :class="[
                              'dropdown-item',
                              { active: sizes.has(size) },
                            ]"
                          >
                            {{ size }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-if="types.length > 0 || type"
                  :class="['dropdown', { show: dropdowns.type }]"
                >
                  <a
                    @click="setDropdown('type')"
                    class="btn dropdown-toggle text-uppercase pr-0"
                    type="button"
                  >
                    {{ type ? type.name : "Rodzaj" }}
                  </a>
                  <span
                    class="badge badge-danger mx-auto"
                    style="margin-left: 1rem!important;"
                    v-if="type"
                    @click="clearFilter('type', null)"
                  >
                    <i class="fas fa-times"></i>
                  </span>
                  <div
                    :class="[
                      'dropdown-menu',
                      'dropdown-primary',
                      { show: dropdowns.type },
                    ]"
                  >
                    <ul>
                      <li
                        @click="setType(type)"
                        v-for="(type, i) in types"
                        :key="i"
                      >
                        <div
                          :class="[
                            'dropdown-item',
                            { 'active-filtr': setActiveType(type) },
                          ]"
                        >
                          {{ type.name }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div :class="['dropdown', { show: dropdowns.sex }]">
                  <a
                    @click="setDropdown('sex')"
                    class="btn dropdown-toggle text-uppercase pr-0"
                    type="button"
                  >
                    {{ sex ? sex.name : "PŁEĆ" }}
                  </a>
                  <span
                    v-if="sex"
                    @click="clearFilter('sex', null)"
                    class="badge badge-danger mx-auto"
                    style="margin-left: 1rem!important;"
                  >
                    <i class="fas fa-times"></i>
                  </span>
                  <div
                    :class="[
                      'dropdown-menu',
                      'dropdown-primary',
                      { show: dropdowns.sex },
                    ]"
                  >
                    <ul>
                      <li
                        @click="setSex(sex)"
                        v-for="(sex, i) in sexList"
                        :key="i"
                      >
                        <div
                          :class="[
                            'dropdown-item',
                            { 'active-filtr': setActiveSex(sex) },
                          ]"
                        >
                          {{ sex.name }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import getParsedSizesSet from "@/helpers/sizes/getParsedSizesSet.js";

export default {
  name: "Filters",

  data() {
    return {
      sexList: [
        {
          id: 4,
          name: "DZIEWCZYNKA",
        },
        {
          id: 8,
          name: "CHŁOPIEC",
        },
        {
          id: 30,
          name: "UNISEX",
        },
      ],
    };
  },
  computed: {
    minSize() {
      return Math.min([...this.$store.getters.sizeList]);
    },
    maxSize() {
      return Math.max([...this.$store.getters.sizeList]);
    },
    apiSession() {
      return this.$store.getters.apiSession;
    },
    products() {
      return this.$store.getters.products;
    },
    subcategories() {
      return this.$store.getters.subcategories;
    },
    subcategory() {
      return this.$store.getters.subcategory;
    },

    dropdowns() {
      return this.$store.getters["FiltersDropdowns/dropdowns"];
    },
    sex() {
      return this.$store.getters.filters.sex;
    },
    mobileFilters() {
      return this.$store.getters.mobileFilters;
    },
    types() {
      return this.$store.getters.types;
    },
    sizes() {
      const sizes = this.$store.getters.filters.sizes;
      if (sizes.size == 0) this.$store.commit("sizes", getParsedSizesSet());
      return this.$store.getters.filters.sizes;
    },
    sizesList() {
      let sizesList = this.$store.getters.sizeList;

      return [...sizesList].reduce((total, size, index) => {
        let group = parseInt(index / 6);
        if (!total[group]) total[group] = [];
        total[group].push(size);
        return total;
      }, []);
    },
    type() {
      return this.$store.getters.filters.type;
    },
    isSocks() {
      return this.type?.name.toLowerCase() == "skarpetki";
    },
  },
  methods: {
    getSessionSize() {
      return `${this.sizes.size > 0 ? `: ${[...this.sizes].join(", ")}` : ""}`;
    },
    setDropdown(dropdown) {
      let newDropdowns = this.dropdowns;
      for (const key in newDropdowns)
        if (key != dropdown) newDropdowns[key] = false;
      newDropdowns[dropdown] = !newDropdowns[dropdown];
      this.$store.commit("FiltersDropdowns/dropdowns", newDropdowns);
    },

    setSizes(size) {
      let newSizes = new Set(this.sizes);
      if ([...newSizes].indexOf(size) > -1) newSizes.delete(size);
      else newSizes.add(size);

      this.$store.commit("sizes", newSizes);
      localStorage.setItem("sizes", JSON.stringify([...newSizes]));

      this.changeFilters();
    },
    setType(type) {
      this.$store.commit("type", type);
      localStorage.setItem("type", JSON.stringify(type));
      if (type.name.toLowerCase() == "skarpetki") {
        this.$store.commit("sizes", new Set());
        localStorage.removeItem("sizes");
      }
      this.dropdowns.type = false;

      this.changeFilters();
    },
    setSex(sex) {
      this.$store.commit("sex", sex);
      localStorage.setItem("sex", JSON.stringify(sex));
      this.dropdowns.sex = false;

      this.changeFilters();
    },

    clearFilter(key, value) {
      this.$store.commit(key, value);
      localStorage.removeItem(key);

      this.changeFilters();
    },

    changeFilters() {
      this.$store.commit("changeFiltersFlag", true);
      this.goToFirstPage();
    },
    goToFirstPage() {
      if (this.$route.params.page != 1)
        this.$router.push({
          params: {
            page: 1,
          },
        });
    },

    setActiveType(type) {
      return type.id == this.type?.id;
    },
    setActiveSex(sex) {
      return sex.id == this.sex?.id;
    },

    parseTypeFromStorage() {
      this.$store.commit("type", JSON.parse(localStorage.getItem("type")));
    },
    parseSexFromStorage() {
      this.$store.commit("sex", JSON.parse(localStorage.getItem("sex")));
    },
  },
  created() {
    this.parseTypeFromStorage();
    this.parseSexFromStorage();
  },
};
</script>

<style scoped>
.dropdown.active .dropdown-menu {
  display: block;
}

.dropdown .btn {
  padding: 0;
  margin-left: 2rem;
}

@media (max-width: 992px) {
  .dropdown:hover > .dropdown-menu {
    display: none;
  }
}

.color-pink {
  color: pink;
}

.color-black {
  color: black;
}
</style>
