<template>
  <form>
    <div class="row">
      <Input
        :hurtInput="input.hurtInput"
        ref="input"
        v-for="(input, i) in registerInputs"
        :key="i"
        :classes="input.classes"
        :label="input.label"
        :simpleRules="input.simpleRules"
        :complexRules="input.complexRules"
        :id="input.id"
        @value="updateRegisterData(input.key, $event)"
        :hr="input.hr"
        :value="input.value"
        :type="input.type"
        :pattern="input.pattern"
        @complexRulesSetSibling="complexRulesSetSibling"
      />
    </div>

    <div class="row mt-3">
      <div class="form-check text-left">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="rodo1"
          id="rodo1"
          name="rodo1"
          required
        />
        <label class="form-check-label" for="rodo1">
          <small
            >Oświadczam, że zapoznałem się z
            <a :href="`${$baseUrl}uploads/${settings.regulations}`"
              ><u><small>Regulaminem</small></u></a
            >
            sklepu {{ contactSettingsValue("company") }} co jest równoznaczne z
            wyrażeniem zgody na przetwarzanie moich danych osobowych w ramach
            opisanych w niniejszym regulaminie.
            <span class="text-danger">*</span></small
          >
        </label>
      </div>
      <div class="form-check text-left">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="rodo2"
          id="rodo2"
          name="rodo2"
          required
        />
        <label class="form-check-label" for="rodo2">
          <small
            >Wyrażam zgodę na przetwarzanie przez danych osobowych podanych w
            formularzu. Podanie danych jest dobrowolne. Administratorem podanych
            przez Pana / Panią danych osobowych jest
            {{ contactSettingsValue("company") }} z siedzibą w
            {{
              `${contactSettingsValue("address")}, ${contactSettingsValue(
                "city"
              )}, ${contactSettingsValue("zip_code")}`
            }}. Pana / Pani dane będą przetwarzane w celach związanych z
            udzieleniem odpowiedzi, przedstawieniem oferty usług
            {{ contactSettingsValue("company") }} oraz świadczeniem usług przez
            administratora danych. Przysługuje Panu / Pani prawo dostępu do
            treści swoich danych oraz ich poprawiania.
            <span class="text-danger">*</span></small
          >
        </label>
      </div>
      <div class="form-check text-left">
        <input
          class="form-check-input"
          type="checkbox"
          value="1"
          id="rodo3"
          name="rodo3"
        />
        <label class="form-check-label" for="rodo3">
          <small
            >Wyrażam zgodę na otrzymywanie informacji handlowych od
            {{ contactSettingsValue("company") }} dotyczących jej oferty w
            szczególności poprzez połączenia telefoniczne lub sms z
            wykorzystaniem numeru telefonu podanego w formularzu, a także zgodę
            na przetwarzanie moich danych osobowych w tym celu przez
            {{ contactSettingsValue("company") }} oraz w celach promocji,
            reklamy i badania rynku.</small
          >
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center py-2 mt-3">
        <button
          @click.prevent="register"
          class="custom-btn text-uppercase font-weight-bold p-2"
        >
          <span>Zarejestruj</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Input from "@/components/forms/Input";
import formValidate from "@/helpers/validation/formValidate";
import statusesKeys from "@/helpers/alertBox/statusesKeys.js";
import alerts from "@/helpers/request/alerts.js";

export default {
  data() {
    return {
      registerData: {},
      rodo1: false,
      rodo2: false,
    };
  },
  components: {
    Input,
  },
  watch: {
    hurtCheckbox() {
      let registerInputs = this.registerInputs;

      let requiredGroups = {
        retail: [
          "registerFirstName",
          "registerLastName",
          "registerEmail",
          "registerPassword",
          "registerPasswordConfirm",
          "registerPhone",
        ],
        wholesale: [
          "registerCompany",
          "registerNip",
          "registerEmail",
          "registerPassword",
          "registerPasswordConfirm",
          "registerPhone",
        ],
      };
      for (let input of registerInputs) {
        input.simpleRules = requiredGroups[
          this.hurtCheckbox ? "wholesale" : "retail"
        ].includes(input.id)
          ? ["required"]
          : [];
      }

      // formValidate(this.$refs.input);
    },
  },
  computed: {
    inputsValidation() {
      return this.$store.getters.inputsValidation;
    },
    hurtCheckbox() {
      return this.$store.getters.hurtCheckbox;
    },
    contactSettings() {
      return this.$store.getters.contactSettings;
    },
    countryList() {
      return this.$store.getters.countryList;
    },
    settings() {
      return this.$store.getters.settings;
    },
    registerInputs() {
      return this.$store.getters.registerInputs;
    },
  },
  methods: {
    contactSettingsValue(field) {
      return this.contactSettings?.[field];
    },
    register() {
      if (!this.rodo1 && !this.rodo2) {
        this.$store.commit("alertBox", {
          status: statusesKeys.error,
          message: alerts.rodoRequired,
        });

        return;
      }

      if (formValidate(this.$refs.input))
        this.$store.dispatch("register", this.registerData);
    },
    createRegisterDataFields() {
      this.registerInputs.forEach(
        (input) => (this.registerData[input.key] = input.value)
      );
    },
    updateRegisterData(key, value) {
      this.registerData[key] = value;
      if (key === "hurt") this.$store.commit("hurtCheckbox", value);
    },
    complexRulesSetSibling(input) {
      this.$children.find((child) => child.id === input.id).validate();
    },
  },
  created() {
    this.createRegisterDataFields();
  },
};
</script>
