export default function totalPrice(products) {
  return products.reduce((sum, product) => sum + product.price, 0);
}
