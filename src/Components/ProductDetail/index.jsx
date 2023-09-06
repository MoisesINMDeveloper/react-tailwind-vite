import { useContext } from "react";
import { ShoppingContext } from "../../Context";

export default function ProductDetail() {
  const context = useContext(ShoppingContext);
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 ease-in-out  shadow-xl w-[360px] h-[100%] flex flex-col fixed right-0 top-[44px] border border-slate-400 bg-white bg-opacity-50 backdrop-blur-lg rounded drop-shadow-lg
       z-30  pb-10 px-auto overflow-auto`}
    >
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-medium px-4 pt-2"> Detail</h2>
        <button onClick={context.toggleProductDetail}>
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
      <figure className=" mx-auto p-6 w-[300px] h-[300px] ">
        <img
          className="w-full h-full rounded-lg"
          src={context.productToShow.image}
          alt={context.productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6 h-[80%] ">
        <span className="text-2xl font-medium  text-end">
          $ {context.productToShow.price}
        </span>
        <span className="font-medium text-md text-center">
          {context.productToShow.title}
        </span>
        <span className="text-sm font-light text-justify">
          {context.productToShow.description}
        </span>
      </p>
    </aside>
  );
}
