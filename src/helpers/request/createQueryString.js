export default function createQueryString(data) {
  let queryString = "?";
  for (let [key, value] of Object.entries(data)) {
    if (value?.constructor == Array || value?.constructor == Set)
      value.forEach((item) => (queryString += `${key}[]=${item}&`));
    else queryString += `${key}=${value}&`;
  }
  return queryString.slice(0, -1);
}
