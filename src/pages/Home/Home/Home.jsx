import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import OurServices from "../OurServices/OurServices";
import Brands from "../Brands/Brands";
import Features from "../Features/Features";
import BecomeMarchant from "../BecomeMarchant/BecomeMarchant";
import Review from "../Review/Review";

const Home = () => {
  

  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurServices></OurServices>
      <Brands></Brands>
      <Features></Features>
      <BecomeMarchant></BecomeMarchant>
      <Review></Review>
    </div>
  );
};

export default Home;
