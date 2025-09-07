import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import Slide from "@mui/material/Slide";
import { MyContext } from "../../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setisOpenModal] = useState(false);
  const [selectedTab, setselectedTab] = useState(null);

  useEffect(() => {
    console.log("Modal State Changed: ", isOpenModal);
  }, [isOpenModal]);

  const context = useContext(MyContext);

  const selectCountry = (index) => {
    setselectedTab(index);
    alert(selectedTab);
    setisOpenModal(false);
  };

  return (
    <>
      <Button
        className="countryDrop"
        onClick={() => {
          setisOpenModal(true);
        }}
      >
        <div className="info d-flex flex-column">
          <span className="label">Your Location</span>
          <span className="country-name">Vietnam</span>
        </div>
        <span className="ml-auto">
          {" "}
          <IoIosArrowDown />
        </span>
      </Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setisOpenModal(false)}
        className="locationModal"
        TransitionComponent={Transition}
      >
        <h4 className="mb-0">Choose your Delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <Button className="close-button" onClick={() => setisOpenModal(false)}>
          <MdClose />
        </Button>

        <div className="searchbar w-100">
          <input type="text" placeholder="Search your area" />
          <Button>
            <IoSearch />
          </Button>
        </div>

        <ul className="countryList mt-3">
          {context.countryList?.length !== 0 &&
            context.countryList?.map((item, index) => {
              return (
                <>
                  <li key={index}>
                    <Button
                      onClick={() => selectCountry(index)}
                      className={`${selectedTab === index ? "active" : ""}`}
                    >
                      {item.country}
                    </Button>
                  </li>
                </>
              );
            })}
        </ul>
      </Dialog>
    </>
  );
};

export default CountryDropdown;
