import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";

export default function MyOrders() {
  const context = useContext(ShoppingContext);

  const calculateTotalPrice = (products) => {
    return products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };
  return (
    <Layout>
      <div className="relative flex items-center w-full">
        <h1 className="font-semibold text-2xl mb-1">My Orders</h1>
      </div>
      <div className="w-full">
        {context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={calculateTotalPrice(order.products)}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
