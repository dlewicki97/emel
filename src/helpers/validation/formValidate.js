export default function formValidate(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const valid = input.validate();
    if (!valid) {
      document.querySelector(`#${input.id}`).scrollIntoView();
      return valid;
    }
  }

  return true;
}
