import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import ProductModal from "./Components/ProductModal/productModal.js";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart/cart.js";
import Product from "./Pages/Product/product.js";
import Checkout from "./Pages/Checkout/checkout.js";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
export const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
    }
  }, []);

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
      console.log("data", res.data.data.country);
    });
  };

  const login = (userData, token) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = {
    countryList,
    isLoggedIn,
    user,
    login,
    logout,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={value}>
        <Header />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route exact={true} path="/login" element={<Login />} />
          <Route exact={true} path="/signup" element={<Signup />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/checkout" element={<Checkout />} />
          <Route exact={true} path="/products/:id" element={<Product />} />
        </Routes>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
