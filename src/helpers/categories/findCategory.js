export default function findCategory(categories, category_id) {
  return categories?.find((category) => category.id == category_id) ?? null;
}
