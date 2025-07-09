import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import apple from "../../assets/images/apples.jpg";

const HomeCat = () => {
  const [itemBg, setitemBg] = useState([
    "#fffceb",
    "#e3effa",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
    "#feefea",
    "#e3effa",
    "#feefea",
    "#fff3eb",
    "#fff3ff",
    "#f2fce4",
  ]);
  return (
    <>
      <section className="homeCat">
        <div className="container">
          <h3 className="mb-3 hd">Featured Categories</h3>
          <Swiper
            slidesPerView={10}
            spaceBetween={8}
            navigation={true}
            slidesPerGroup={1}
            modules={[Navigation]}
            className="mySwiper"
          >
            {itemBg?.map((item, index) => {
              return (
                <SwiperSlide>
                  <div
                    className="item text-center cursor"
                    style={{ background: item }}
                  >
                    <img
                      src="https://toppng.com/uploads/preview/apple-fruit-115496753011rcapzgthc.png"
                      alt="Apple"
                    />
                    <h6>Red Apple</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
    </>
  );
};
export default HomeCat;
