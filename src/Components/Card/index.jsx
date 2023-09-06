import { useContext } from "react";
import { ShoppingContext } from "../../Context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Card(data) {
  const context = useContext(ShoppingContext);
  const showProduct = (productDetail) => {
    context.openProductDetail();
    // PENDIENTE AQUI EN ESTA PARTE DEL CODIGO NECESITO APLICAR UN CONDICIONAL PARA QUE CIERRE ASIDE CUANDO SE CLICKEE LA MISMA CARD, PERO SI SE CLICKEA OTRA DISTINTA QUE CAMBIE EL PRODUCTO
    // context.toggleProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };

  // CALCULAR EL SHOPPING BAG
  const calculateItems = (items) => {
    if (items === "add") {
      context.setCartProducts([...context.cart]);
    } else if (items === "remove") {
      if (context.cart.length > 0) {
        const updateCart = context.cart.slice(0, -1);
        context.setCartProducts(updateCart);
      }
    }
  };

  // AGREGAR PRODUCTOS AL SHOPPING BAG
  const addProductsToCart = (productData) => {
    context.closeProductDetail();
    context.setCartProducts([...context.cartProducts, productData]);
    context.closeCheckoutSideMenu();
    context.openCheckoutSideMenu();
  };

  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <button className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 p-1 m-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-full h-full text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button
          className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 p-1 m-2 bg-white rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            calculateItems();
          }}
        >
          <svg
            onClick={() => addProductsToCart(data.data)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      );
    }
  };

  return (
    <article
      className=" w-60  bg-white rounded-lg shadow-lg cursor-pointer h-[16rem] p-2 "
      onClick={() => showProduct(data.data)}
    >
      <figure className="relative w-full mb-2 h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5 z-10">
          {data.data.category}
        </span>
        <LazyLoadImage
          className="object-contain w-full h-[200px] rounded-lg"
          effect="blur"
          height={"100%"}
          width={"100%"}
          src={data.data.image}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="flex items-center justify-between px-2 py-1 ">
        <span className="text-sm font-light line-clamp-1 ">
          {data.data.title}
        </span>
        <span className="text-lg font-medium">${data.data.price} </span>
      </p>
    </article>
  );
}
