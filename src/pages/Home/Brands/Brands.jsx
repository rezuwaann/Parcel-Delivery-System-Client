import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import "swiper/css";

const Brands = () => {
  const brandLogos = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
  ];

  return (
    <div className="my-20 text-center">
      <h1 className="font-bold text-3xl my-10">
        We've helped thousands of sales teams
      </h1>

      <Swiper
        slidesPerView={6}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        modules={[Autoplay]}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        loop={true}
        freeMode={true}


breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}

        className="flex items-center "
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" className="w-30 object-contain blcok" />
          </SwiperSlide>
        ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default Brands;
