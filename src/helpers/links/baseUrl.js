export default function baseUrl() {
  let baseUrl = window.location.origin.includes("localhost")
    ? "http://localhost/emel/"
    : `${window.location.origin}/`;
  if (!window.location.origin.includes("localhost"))
    baseUrl = `${window.location.origin}/`;

  return baseUrl;
}
