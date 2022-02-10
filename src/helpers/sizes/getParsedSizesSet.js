export default function getParsedSizesSet() {
  return new Set(JSON.parse(localStorage.getItem("sizes")));
}
