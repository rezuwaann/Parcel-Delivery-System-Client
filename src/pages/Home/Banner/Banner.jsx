import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImage1 from "../../../assets/banner/banner1.png";
import bannerImage2 from "../../../assets/banner/banner2.png";
import bannerImage3 from "../../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} swipeable={true} labels={false} showArrows={false} showStatus={false} showThumbs={false}>
      <div>
        <img src={bannerImage1} className="rounded-4xl"/>

      </div>
      <div>
        <img src={bannerImage2} className="rounded-4xl"/>

      </div>
      <div>
        <img src={bannerImage3} className="rounded-4xl"/>

      </div>
      
    </Carousel>
  );
};

export default Banner;
