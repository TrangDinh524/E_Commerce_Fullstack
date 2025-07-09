import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import CountryDropdown from "../CountryDropdown";
import { IoBagOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import SearchBar from "./SearchBar/searchbar.js";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Navigation from "./Navigation/navigation.js";
import { useContext } from "react";
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    context.logout();
    navigate("/");
  };

  return (
    <>
      <div className="header-container">
        <div className="top-strip bg-notice">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Due to the <b>COVID 19</b> epidemic, orders may be processed with
              a slight delay
            </p>
          </div>
        </div>
        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logo-container d-flex align-items-center col-sm-2">
                <Link to={"/"}>{/* <img src={Logo} alt="Logo" /> */}</Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                {context.countryList.length !== 0 && <CountryDropdown />}

                <SearchBar />

                {/*login-signup*/}
                <div className="part3 d-flex align-items-center ml-auto">
                  {context.isLoggedIn ? (
                    // Logged in
                    <>
                      <Button className="circle mr-3" title="My Account">
                        <FiUser />
                      </Button>
                      <div className="ml-auto cart d-flex align-items-center">
                        <span className="price">$3.29</span>
                        <div className="position-relative ml-2">
                          <Button className="circle">
                            <IoBagOutline />
                          </Button>
                          <span className="count d-flex align-items-center justify-content-center">
                            1
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outlined"
                        size="small"
                        style={{
                          color: "#333",
                          borderColor: "#333",
                          fontSize: "12px",
                          padding: "4px 12px",
                        }}
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
                          className="mr-2"
                          style={{
                            color: "#333",
                            borderColor: "#333",
                            fontSize: "12px",
                            padding: "4px 12px",
                          }}
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          style={{
                            backgroundColor: "#333",
                            color: "white",
                            fontSize: "12px",
                            padding: "4px 12px",
                          }}
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
            </div>
          </div>
        </header>
        <nav>
          <Navigation />
        </nav>
      </div>
    </>
  );
};

export default Header;
