export default function productsDataToArray(products) {
  const data = products.data;
  products.data = Object.values(data);
  for (const product of products.data) {
    const items = product.items;
    product.items = Object.values(items);
  }
  return products;
}
