import { useContext, useState, useEffect } from "react";
import { ShoppingContext } from "../../Context";
import totalPrice from "../../Utils";
import { Link } from "react-router-dom";
import { OrderCard } from "../../Components/OrderCard";
import Layout from "../../Components/Layout";

export default function MyOrder() {
  const context = useContext(ShoppingContext);
  const currentPath = window.location.pathname;

  const [index, setIndex] = useState(
    currentPath.substring(currentPath.lastIndexOf("/") + 1)
  );
  useEffect(() => {
    if (index === "last") setIndex(context.order?.length - 1);
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center w-80 relative mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="font-semibold text-2xl mb-1">My Order</h1>
      </div>
      <div className="flex-1 p-8 px-6 overflow-y-auto">
        {context.order &&
          context.order[index] &&
          context.order[index].products.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageUrl={product.image}
              price={product.price}
            />
          ))}
        <div className="flex w-full mt-4">
          <div className="flex w-full items-center justify-end">
            <span className="font-light text-2xl ml-[21rem] pr-2">Total </span>
            <span className="font-medium text-2xl pr-2">
              $
              {context.order && context.order[index]
                ? totalPrice(context.order[index].products)
                : 0}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
// totalPrice(context.order?.[index]?.products);
