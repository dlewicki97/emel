import validateNIP from "@/helpers/validation/nip";

export default {
  required: (v) => v.length > 0 || "To pole jest wymagane!",

  email: (v) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || "To jest nieprawidłowy adres e-mail!",

  passwordLength: (v) =>
    v.length >= 8 || "Hasło powinno mieć 8 liter długośći!",

  numeric: (v) => !isNaN(v) || "To pole powinno zawierać tylko cyfry!",

  zipCode: (v) => v.length > 0 || "To pole nie może być puste!",

  phone: (v) =>
    !v
      ? true
      : /^\+{0,1}([0-9]{9,20})$/.test(v) ||
        "Numer telefonu powinien mieć długość od 9 do 20 liczb oraz nie zawierać spacji!",

  nip: validateNIP,
};
