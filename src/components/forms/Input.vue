<template>
  <div v-if="!hurtInput || hurtCheckbox == hurtInput" :class="classes">
    <hr v-if="hr" />
    <div v-if="type === 'checkbox'" class="custom-control custom-checkbox">
      <input
        :pattern="pattern"
        type="checkbox"
        class="custom-control-input"
        :id="id"
        v-model="inputValue"
        @change="$emit('value', inputValue)"
      />
      <label class="custom-control-label text-uppercase" :for="id">{{
        getLabel
      }}</label>
    </div>
    <div v-else-if="type === 'textarea'">
      <label class="text-uppercase" :for="id">{{ label }}</label>
      <textarea
        :pattern="pattern"
        class="form-control"
        :id="id"
        v-model="inputValue"
        @change="$emit('value', inputValue)"
      ></textarea>
    </div>
    <div class="" v-else>
      <label class="text-uppercase mb-0">{{ getLabel }}</label>
      <div class="small_valid text-danger">{{ errors }}</div>
      <select
        @change="$emit('value', inputValue)"
        v-if="type === 'select'"
        class="form-control d-block"
        v-model="inputValue"
      >
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
      <input
        :id="id"
        :pattern="pattern"
        v-else
        :type="type ? type : 'text'"
        @keyup="validate"
        class="form-control"
        v-model="inputValue"
      />
    </div>
    <div
      v-if="type == 'password' || showPasswordFlag"
      @click="showPassword"
      class="show-password"
    >
      Pokaż hasło
    </div>
    <hr v-if="hr" />
  </div>
</template>

<script>
import SimpleRules from "@/helpers/validation/simpleRules";
import ComplexRules from "@/helpers/validation/complexRules";

export default {
  props: [
    "value",
    "label",
    "simpleRules",
    "complexRules",
    "classes",
    "type",
    "id",
    "hr",
    "hurtInput",
    "pattern",
    "addressInput",
  ],
  data() {
    return {
      inputValue: this.type === "select" ? "PL" : "",
      showPasswordFlag: false,
      simpleRulesErrors: "",
      complexRulesErrors: "",
    };
  },
  computed: {
    inputValidates() {
      return this.$store.getters.inputValidates;
    },
    countryList() {
      return this.$store.getters.countryList;
    },
    hurtCheckbox() {
      return this.$store.getters.hurtCheckbox;
    },
    errors() {
      return `${this.simpleRulesErrors} ${this.complexRulesErrors}`.trim();
    },
    currentInputs() {
      return this.$store.getters["CurrentInputs/currentInputs"];
    },
    valid() {
      return !Boolean(this.errors);
    },
    getLabel() {
      return this.label + (this.simpleRules.includes("required") ? "*" : "");
    },
  },
  watch: {
    value() {
      if (this.value !== undefined) this.inputValue = this.value;
    },
  },
  methods: {
    showPassword() {
      this.showPasswordFlag = !this.showPasswordFlag;
      document.querySelector(`#${this.id}`).type = this.showPasswordFlag
        ? "text"
        : "password";
    },
    setComplexRulesMatches() {
      let newCurrentInputs = this.currentInputs;

      newCurrentInputs.forEach((input) => {
        let complexRules = input.complexRules?.filter(
          (rule) => rule.matchId === this.id
        );
        for (let i = 0; i < complexRules?.length; i++) {
          if (complexRules[i].match == this.inputValue) continue;

          complexRules[i].match = this.inputValue;
          this.$emit("complexRulesSetSibling", input);
        }
      });

      this.$store.commit("CurrentInputs/currentInputs", newCurrentInputs);
    },
    setSimpleRulesErrors() {
      this.simpleRulesErrors = this.simpleRules
        .reduce((errors, rule) => {
          if (!this.hurtCheckbox && this.hurtInput) return errors;

          const result = SimpleRules[rule](this.inputValue);
          if (result.constructor !== Boolean) errors.push(result);

          return errors;
        }, [])
        .join(" ");
    },
    setComplexRulesErrors() {
      this.complexRulesErrors = this.complexRules
        ? this.complexRules
            .reduce((errors, rule) => {
              const result = ComplexRules[rule.name](
                this.inputValue,
                rule.match
              );
              if (result.constructor !== Boolean) errors.push(result);

              return errors;
            }, [])
            .join(" ")
        : "";
    },
    validate() {
      const isInputValueString = this.inputValue?.constructor === String;
      this.$emit(
        "value",
        isInputValueString ? this.inputValue.trim() : this.inputValue
      );

      this.setComplexRulesMatches();

      this.setSimpleRulesErrors();
      this.setComplexRulesErrors();

      const currentInputs = this.currentInputs;
      currentInputs.find((input) => input.id == this.id).valid = this.valid;

      this.$store.commit("CurrentInputs/currentInputs", currentInputs);

      return this.valid;
    },
    addToCurrentInputs() {
      let currentInputs = this.currentInputs;

      if (!currentInputs.find((input) => input.id == this.id)) {
        currentInputs.push(this._props);
        this.$store.commit("CurrentInputs/currentInputs", currentInputs);
      }
    },
    deleteFromCurrentInputs() {
      let currentInputs = this.currentInputs;
      const inputIndex = currentInputs.findIndex(
        (input) => input.id == this.id
      );
      if (inputIndex > -1) {
        currentInputs.splice(inputIndex, 1);
        this.$store.commit("CurrentInputs/currentInputs", currentInputs);
      }
    },
  },
  created() {
    if (this.value !== undefined) this.inputValue = this.value;

    this.setComplexRulesMatches();
    this.addToCurrentInputs();
  },
  destroyed() {
    this.deleteFromCurrentInputs();
  },
};
</script>

<style>
.show-password {
  color: #a29f9f;
  font-size: 0.8rem;
  cursor: pointer;
}
</style>
