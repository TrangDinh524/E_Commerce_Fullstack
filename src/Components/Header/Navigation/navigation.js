import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { useState, useEffect, createContext } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Navigation = () => {
  const [isOpenSidebarVal, setisopenSidebarVal] = useState(false);
  return (
    <>
      <nav>
        <div className="container">
          <div className="row">
            <div className="col-sm-2 navPart1">
              <div className="catWrapper">
                <Button
                  className="allCatTab align-items-center"
                  onClick={() => setisopenSidebarVal(!isOpenSidebarVal)}
                >
                  <span className="icon1">
                    <IoIosMenu />
                  </span>
                  <span> ALL CATEGORIES</span>
                  <span className="icon2">
                    <IoIosArrowDown />
                  </span>
                </Button>
                <div
                  className={`sidebarNav ${
                    isOpenSidebarVal === true ? "open" : ""
                  }`}
                >
                  <ul>
                    <li>
                      <Link to="/">
                        <Button>Shop</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Meats & Seafood</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Bakery</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>
                          Beverages <FaAngleRight className="ml-auto" />
                        </Button>
                      </Link>
                      <div className="submenu">
                        <Link to="/">
                          <Button>Coffee</Button>
                        </Link>
                        <Link to="/">
                          <Button>Bubble Tea</Button>
                        </Link>
                        <Link to="/">
                          <Button>Tea</Button>
                        </Link>
                      </div>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Blog</Button>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Button>Contact</Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-sm-10 navPart2 d-flex align-items-center">
              <ul className="list list-inline ml-auto">
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>
                      <CiHome /> &nbsp; Home
                    </Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Shop</Button>
                  </Link>
                  <div className="submenu shadow">
                    <Link to="/">
                      <Button>Men</Button>
                    </Link>
                    <Link to="/">
                      <Button>Women</Button>
                    </Link>
                    <Link to="/">
                      <Button>Kids</Button>
                    </Link>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Meats&Seafood</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Bakery</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Beverages</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Blog</Button>
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link to="/">
                    <Button>Contact</Button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
