import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "../Context";
import Home from "../Pages/Home";
import MyAccount from "../Pages/MyAccount";
import MyOrder from "../Pages/MyOrder";
import MyOrders from "../Pages/MyOrders";
import NotFound from "../Pages/NotFound";
import Signin from "../Pages/Signin";
import CheckoutSideMenu from "../Components/CheckoutSideMenu";

import Navbar from "../Components/Navbar";
import "../App.css";

// Manera aprendida por Oscar Barajas enrutamiendo de proyecto
export default function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men's clothing" element={<Home />} />
          <Route path="/electronics" element={<Home />} />
          <Route path="/jewelery" element={<Home />} />
          <Route path="/women's clothing" element={<Home />} />
          <Route path="/others" element={<Home />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-order" element={<MyOrder />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-orders/last" element={<MyOrder />} />
          <Route path="/my-orders/:id" element={<MyOrder />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ContextProvider>
  );
}
