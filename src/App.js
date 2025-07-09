import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
export const MyContext = createContext();

function App() {
  const [countryList, setCountryList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries/");
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const getCountry = async (url) => {
    const responsive = await axios.get(url).then((res) => {
      setCountryList(res.data.data);
      console.log("data", res.data.data.country);
    });
  };

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
