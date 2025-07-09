import React, { useState } from "react";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HomeBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    customPaging: function (i) {
      return <div className="custom-dot"></div>;
    },
  };
  return (
    <div className="container">
      <div
        className="homeBannerSection"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Slider {...settings} ref={(slider) => (window.slider = slider)}>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png"
              className="w-100"
            />
          </div>
          <div className="item">
            <img
              src="https://cmsimages.shoppersstop.com/SS_25_main_kv_web_fd8e548010/SS_25_main_kv_web_fd8e548010.png"
              className="w-100"
            />
          </div>
        </Slider>
        {/* Custom Navigation Arrows */}
        <div className={`slider-arrows ${isHovered ? "show" : ""}`}>
          <button
            className="arrow-btn prev-arrow"
            onClick={() => window.slider?.slickPrev()}
          >
            <IoIosArrowBack />
          </button>
          <button
            className="arrow-btn next-arrow"
            onClick={() => window.slider?.slickNext()}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
