import React from "react";

import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

const Features = () => {
  return (
    <div className="w-11/12  md:w-full mx-auto">
      <hr className="border-dashed border-gray-400" />

      <div className="flex flex-col lg:flex-row items-center my-10 bg-white p-10 rounded-lg gap-5 lg:gap-15 shadow-xl">
        <img src={liveTracking} alt="" className="h-30 lg:h-40 w-30 lg:w-40" />

        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-gray-400 self-stretch" />
   

        <div className="space-y-3">
          {" "}
          <h1 className="font-bold text-2xl">Live Parcel Tracking</h1>
          <p>
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment s journey and get
            instant status updates for complete peace of mind.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center my-10 bg-white p-10 rounded-lg gap-5 lg:gap-15 shadow-xl">
        <img src={safeDelivery} alt="" className="h-30 lg:h-40 w-30 lg:w-40" />

           <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-gray-400 self-stretch" />

        <div className="space-y-3">
          {" "}
          <h1 className="font-bold text-2xl">100% Safe Delivery</h1>
          <p>
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe and damage-free delivery every time.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center my-10 bg-white p-10 rounded-lg gap-5 lg:gap-15 shadow-xl">
        <img src={safeDelivery} alt="" className="h-30 lg:h-40 w-30 lg:w-40" />

           <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-gray-400 self-stretch" />
             <div className="space-y-3">
          {" "}
          <h1 className="font-bold text-2xl">24/7 Call Center Support</h1>
          <p>
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, or delivery concerns—anytime you
            need us
          </p>
        </div>
      </div>

      <hr className="border-dashed border-gray-400" />
    </div>
  );
};

export default Features;
