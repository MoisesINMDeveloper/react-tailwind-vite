import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingContext } from "../../Context";
import { OrderCard } from "../../Components/OrderCard";
import totalPrice from "../../Utils";

export default function CheckoutSideMenu() {
  const context = useContext(ShoppingContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id != id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const date = new Date();
    const orderToAdd = {
      date: date.toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrices: totalPrice(context.cartProducts),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setCount(0);
    context?.setSearchByTitle(null);
    context.closeCheckoutSideMenu();
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out  shadow-xl w-[24rem] h-[100%] flex flex-col fixed right-0 top-[44px] border border-slate-400 bg-white bg-opacity-50 backdrop-blur-lg rounded drop-shadow-lg
    z-30 pb-16`}
    >
      <div className="flex items-center justify-between p-6">
        <h2 className="text-xl font-medium"> My Order</h2>
        <button onClick={context.closeCheckoutSideMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 px-6 overflow-y-auto">
        {context.cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.image}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6 mb-2 ">
        <p className="flex items-center justify-between my-5">
          <span className="text-xl font-light">Total</span>
          <span className="text-2xl font-medium">
            $ {totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            onClick={() => handleCheckout()}
            className="w-full py-3 text-xl font-semibold text-white bg-blue-400 rounded-xl"
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}
