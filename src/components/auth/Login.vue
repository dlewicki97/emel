<template>
  <form>
    <div class="row">
      <Input
        v-for="(input, i) in inputs"
        :key="i"
        ref="input"
        :classes="input.classes"
        :label="input.label"
        :simpleRules="input.simpleRules"
        :id="input.id"
        @value="updateLoginData(input.key, $event)"
        :type="input.type"
        :value="input.value"
      />

      <div class="text-center w-100">
        <a :href="`${$baseUrl}resetuj-haslo`"
          ><u><small>Zresetuj hasło</small></u></a
        >
      </div>
      <div class="col-12 text-center py-2 mt-3">
        <button
          @click.prevent="login"
          class="custom-btn text-uppercase font-weight-bold p-2"
        >
          <span>Zaloguj</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Input from "@/components/forms/Input";
import setCurrentInputs from "@/helpers/validation/setCurrentInputs";
import formValidate from "@/helpers/validation/formValidate";

export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      inputs: [
        {
          valid: false,
          classes: ["col-12", "text-left", "py-2"],
          label: "E-mail",
          simpleRules: ["required", "email"],
          id: "loginEmail",
          key: "email",
          type: "email",
          value: "",
        },
        {
          valid: false,
          classes: ["col-12", "text-left", "py-2"],
          label: "Hasło",
          simpleRules: ["required", "passwordLength"],
          id: "loginPassword",
          key: "password",
          type: "password",
          value: "",
        },
      ],
    };
  },
  components: {
    Input,
  },
  methods: {
    updateLoginData(key, value) {
      this.loginData[key] = value;
    },
    login() {
      if (formValidate(this.$refs.input))
        this.$store.dispatch("login", this.loginData);
    },
    setCurrentInputs,
  },
};
</script>
