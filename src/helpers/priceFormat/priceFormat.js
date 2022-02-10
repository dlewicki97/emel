export default function priceFormat(price) {
  price = price.toFixed(2);
  let integers = price.split(".")[0].toString();
  let floats = price.split(".")[1].toString();
  let newIntegers = "";
  for (let i = integers.length - 1; i >= 0; i--) {
    newIntegers += integers[integers.length - i - 1];
    if (i % 3 == 0) newIntegers += " ";
  }

  return `${newIntegers.trim()}.${floats}`;
}
