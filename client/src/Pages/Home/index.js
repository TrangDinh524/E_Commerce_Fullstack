import HomeBanner from "../../Components/HomeBanner/homeBanner";
import HomeCat from "../../Components/HomeCat/homeCat";
import ProductItem from "../../Components/ProductItem/productItem";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiApple } from "react-icons/ci";
import { TbRosetteDiscountOff, TbTruckDelivery } from "react-icons/tb";
import { IoMailOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import discount_banner from "../../assets/images/discount_banner.jpg";
import discount_banner_2 from "../../assets/images/discount_banner_2.jpg";
import newsletterImg from "../../assets/images/coupon.png";
import { BiSupport } from "react-icons/bi";
import { GetProducts } from "../../services/productsService";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const bestSellerResponse = await GetProducts({
        limit: 8,
      });
      const newProductsResponse = await GetProducts({
        limit: 7,
      });

      setBestSellerProducts(bestSellerResponse.products, []);
      setNewProducts(newProductsResponse.products, []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };
  var productSLiderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };
  return (
    <>
      <HomeBanner />
      <HomeCat />
      <section className="homeProducts">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="sticky">
                <div className="banner">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525757507_NewProject(34).jpg"
                    className="cursor w-100"
                    alt="Banner_1"
                  ></img>
                </div>
                <div className="banner mt-4">
                  <img
                    src="https://api.spicezgold.com/download/file_1734525767798_NewProject(35).jpg"
                    className="cursor w-100"
                    alt="Banner_2"
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center">
                <div className="info">
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="bestSellerProduct w-100 mt-4">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {bestSellerProducts.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductItem product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="d-flex align-items-center mt-5">
                <div className="info">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light mb-0">
                    New products with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn">
                  View All <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="bestSellerProduct productRow2 w-100 mt-4 d-flex">
                {newProducts.map((product) => (
                  <ProductItem
                    // key={product.id}
                    product={product}
                  />
                ))}
              </div>

              <div className="d-flex mt-4 mb-5 bannerSec">
                <div className="banner">
                  <img src={discount_banner} className="cursor w-100" />
                </div>
                <div className="banner">
                  <img src={discount_banner_2} className="cursor w-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="newsletter-content">
                <div className="discount-badge">
                  <span className="discount-text">$20</span>
                  <span className="discount-label">OFF</span>
                </div>

                <h2 className="newsletter-title">
                  Join our newsletter and get exclusive offers
                </h2>

                <p className="newsletter-subtitle">
                  Subscribe now to receive updates on promotions, coupons, and
                  special deals
                </p>

                <div className="newsletter-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Exclusive discounts</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Early access to sales</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">✓</span>
                    <span>Free shipping offers</span>
                  </div>
                </div>

                <form className="newsletter-form d-flex align-items-center">
                  <div className="input-wrapper">
                    <IoMailOutline className="email-icon" />
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      className="newsletter-input"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="subscribe-btn"
                    variant="contained"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <img
                className="w-70"
                src={newsletterImg}
                alt="newsletter_image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="highlightSection mt-3">
        <div className="container">
          <div className="row">
            <div className="highlight">
              <CiApple />
              <span>Everyday fresh products</span>
            </div>
            <div className="highlight">
              <TbTruckDelivery />
              <span>Free delivery for order over $70</span>
            </div>
            <div className="highlight">
              <TbRosetteDiscountOff />
              <span>Daily Mega Discounts</span>
            </div>
            <div className="highlight">
              <BiSupport />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
