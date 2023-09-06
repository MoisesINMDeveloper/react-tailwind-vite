import { createContext, useState, useEffect } from "react";
import { urlApi } from "../Api";

export const ShoppingContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //Contar productos para Shopping Bag
  const [count, setCount] = useState(0);

  //Abrir y cerrar el Aside
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);
  const toggleProductDetail = () =>
    setIsProductDetailOpen(!isProductDetailOpen);

  //Abrir y cerrar el Aside-Checkout
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
  const toggleCheckoutSideMenu = () =>
    setIsCheckoutSideMenuOpen(!isCheckoutSideMenuOpen);

  // Insertar productos en el Shopping bag
  const [productToShow, setProductToShow] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [order, setOrder] = useState([]);
  // My Order Shopping Cart

  // Rutas para My Order
  const [orderToShow, setOrderToShow] = useState(Number);

  //SEARCH BY TITLE Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null);

  const [filteredItems, setFilteredItems] = useState(null);
  //SEARCH BY CATEGORY
  const [searchByCategory, setSearchByCategory] = useState();

  //GET PRODUCTS
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(urlApi)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items, searchByCategory) => {
    const categoryLowerCase = searchByCategory.toLowerCase();
    return items?.filter((item) =>
      item.category.toLowerCase().includes(categoryLowerCase)
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(items, searchByTitle);
    }

    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(items, searchByCategory).filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return items;
    }
  };
  useEffect(() => {
    if (searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy(
          "BY_TITLE_AND_CATEGORY",
          items,
          searchByTitle,
          searchByCategory
        )
      );
    if (searchByTitle && !searchByCategory)
      setFilteredItems(
        filterBy("BY_TITLE", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && searchByCategory)
      setFilteredItems(
        filterBy("BY_CATEGORY", items, searchByTitle, searchByCategory)
      );
    if (!searchByTitle && !searchByCategory)
      setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory));
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingContext.Provider
      value={{
        count,
        setCount,
        toggleProductDetail,
        isProductDetailOpen,
        openProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        toggleCheckoutSideMenu,
        closeProductDetail,
        closeCheckoutSideMenu,
        order,
        setOrder,
        orderToShow,
        setOrderToShow,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
