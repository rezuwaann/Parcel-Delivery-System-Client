import React from "react";
import becomeMarchant from '../../../assets/be-a-merchant-bg.png'
import marchantImage from '../../../assets/location-merchant.png'
import { Link } from "react-router";

const BecomeMarchant = () => {
  return (
    <div className="w-11/12 lg:w-full mx-auto flex bg-[#1B2E3C] text-white p-10 lg:p-20 items-center rounded-xl">
      <div className="w-full g:w-3/5 space-y-10 text-center">
        <h1 className=" text-2xl lg:text-4xl font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
        <p className="text-gray-400">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col justify-center md:flex-row font-bold gap-3">
          <Link to={'/rider'} className="rounded-full px-5 py-3 bg-[#7C3AED]">Become a Rider</Link>
          {/* <button className="rounded-full px-5 py-3 text-[#7C3AED] border-2 border-[#7C3AED]">Earn With Uthao Courier</button> */}
        </div>
      </div>


      <div className="hidden lg:block">
<img src={marchantImage} alt="" className=""/>
      </div>
    </div>
  );
};

export default BecomeMarchant;
