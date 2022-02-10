export default {
  passwordConfirm: (password, passwordConf) =>
    password == passwordConf || "Hasła muszą być takie same!",

  emailConfirm: (email, emailConf) => {
    return email == emailConf || "Adresy muszą być takie same!";
  },
};
