import Logo from "../../assets/images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CountryDropdown from "../CountryDropdown";
import { IoBagOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import SearchBar from "./SearchBar/searchbar.js";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Navigation from "./Navigation/navigation.js";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import { getCartCount } from "../../services/cartService";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    context.logout();
    navigate("/");
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await getCartCount();
        setCartCount(response.count);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };
    fetchCartCount();
  }, []);

  return (
    <>
      <div className="header-container">
        {!isAuthPage && (
          <div className="top-strip">
            <div className="container">
              <p className="mb-0 mt-0 text-center">
                Due to the <b>COVID 19</b> epidemic, orders may be processed
                with a slight delay
              </p>
            </div>
          </div>
        )}
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logo-container d-flex align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              {!isAuthPage && (
                <div className="col-sm-10 d-flex align-items-center part2">
                  {context.countryList.length !== 0 && <CountryDropdown />}

                  <SearchBar />

                  {/*login-signup*/}
                  <div className="part3 d-flex align-items-center ml-auto">
                    {context.isLoggedIn ? (
                      // Logged in
                      <>
                        <Button className="user-icon mr-3" title="My Account">
                          <FiUser />
                        </Button>
                        <div
                          className="cart d-flex align-items-center"
                          onClick={() => navigate("/cart")}
                        >
                          <div className="position-relative ml-2">
                            <Button className="user-icon">
                              <IoBagOutline />
                            </Button>
                            <span className="count d-flex align-items-center justify-content-center">
                              {cartCount}
                            </span>
                          </div>
                        </div>
                        <Button
                          onClick={handleLogout}
                          variant="outlined"
                          size="small"
                          className="auth-btn auth-btn-outline"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      // Not Logged in
                      <>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outlined"
                            size="small"
                            className="mr-2 auth-btn auth-btn-outline"
                            onClick={() => navigate("/login")}
                          >
                            Login
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            className="auth-btn auth-btn-primary"
                            onClick={() => navigate("/signup")}
                          >
                            Sign Up
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                  {/*End of login-signup*/}

                  {/*Cards*/}

                  {/*End of cards*/}
                </div>
              )}
            </div>
          </div>
        </header>
        {!isAuthPage && (
          <nav>
            <Navigation />
          </nav>
        )}
      </div>
    </>
  );
};

export default Header;
