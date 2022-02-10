export default function prepareSizesToStorage(sizes) {
  return JSON.stringify(new Set([...this.sizes, size]));
}
