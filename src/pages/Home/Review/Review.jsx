import React, { use } from "react";
import customeTop from "../../../assets/customer-top.png";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import ReviewQuote from "../../../assets/reviewQuote.png";
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Review = () => {
  // const reviews=use(reviewsPromise);
  // console.log(reviews)

  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center items-center text-center space-y-5">
        <img src={customeTop} alt="" />
        <h1 className="font-bold text-4xl">What our customers are sayings</h1>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <div className="mt-10">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
    
          coverflowEffect={{
            rotate: 30,
            stretch: 50,
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          loop={true}
         
          speed={3000}
        //   autoplay={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
       
          pagination={true}
          modules={[EffectCoverflow, Pagination,Autoplay]}

          breakpoints={{
          320: {
            slidesPerView: 1,
       
          },
          640: {
            slidesPerView: 2,
          
          },
          10224: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
         
          
        }}

          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide className="p-10 space-y-5 bg-white">
              <div>
                <img src={ReviewQuote} alt="" />
                <p className="text-3xl font-bold">{review.review}</p>
              </div>
              <hr className="border-dashed border-gray-400" />

              <div className="flex items-center gap-5">
                <img
                  src={review.user_photoURL}
                  alt=""
                  className="rounded-full w-20 h-20 object-cover"
                />
                <div>
                  <h1 className="text-3xl font-semibold">{review.userName}</h1>
                  <h2 className="text-gray-400 font-semibold">
                    Rating : {review.ratings}
                  </h2>
                </div>
              </div>
            </SwiperSlide>
          ))}{" "}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
