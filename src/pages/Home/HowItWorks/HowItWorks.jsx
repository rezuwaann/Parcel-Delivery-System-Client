import React from "react";
import { LuTruck } from "react-icons/lu";
import bookingIcon from '../../../assets/bookingIcon.png'
const HowItWorks = () => {
  return (
    <div className="w-11/12 lg:max-w-6xl mx-auto">
      <h1 className="font-bold text-3xl mt-10 mb-5">How It Works</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 lg:p-7 rounded-xl flex flex-col gap-3 shadow-xl">
         
          <img src={bookingIcon} className="w-12 h-12" alt="" />
          <h2 className="font-bold text-xl">Booking Pickup & Drop</h2>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time
          </p>
        </div>

        <div className="bg-white p-3 lg:p-7 rounded-xl flex flex-col gap-3 shadow-xl">
         <img src={bookingIcon} className="w-12 h-12" alt="" />
          <h2 className="font-bold text-xl">Cash On Delivery</h2>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time
          </p>
        </div>
        <div className="bg-white p-3 lg:p-7 rounded-xl flex flex-col gap-3 shadow-xl">
         <img src={bookingIcon} className="w-12 h-12" alt="" />
          <h2 className="font-bold text-xl">Delivery Hub</h2>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time
          </p>
        </div>
        <div className="bg-white p-3 lg:p-7 rounded-xl flex flex-col gap-3 shadow-xl">
         <img src={bookingIcon} className="w-12 h-12" alt="" />
          <h2 className="font-bold text-xl">Booking SME & Corporate</h2>
          <p>
            From personal packages to business shipments — we deliver on time,
            every time
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
