import React from "react";
import serviceImg from "../../../assets/service.png";

const OurServices = () => {
  return (
    <div className="w-11/12 md:w-full mx-auto bg-[#1B2E3C]  text-white rounded-lg px-5 lg:px-10 py-20 mt-10 text-center">
      <div className="space-y-5">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <p className="text-gray-400">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br></br> business shipments — we
          deliver on time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">Express & Standard Delivery</h1>
          <p className="flex-1 text-gray-400">
            We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
            hours from pick-up to drop-off
          </p>
        </div>

        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">Nationwide Delivery</h1>
          <p className="flex-1 text-gray-400">
            We deliver parcels nationwide with home delivery in every district,
            ensuring your products reach customers within 48–72 hours.
          </p>
        </div>

        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">Fulfillment Solution</h1>
          <p className="flex-1 text-gray-400">
            We also offer customized service with inventory management support,
            online order processing, packaging, and after sales support
          </p>
        </div>

        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">Cash on Home Delivery</h1>
          <p className="flex-1 text-gray-400">
            100% cash on delivery anywhere in Bangladesh with guaranteed safety
            of your product.
          </p>
        </div>

        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">
            Corporate Service & Contract In Logistics
          </h1>
          <p className="flex-1 text-gray-400">
            Customized corporate services which includes warehouse and inventory
            management support.
          </p>
        </div>

        <div className="bg-[#243444] text-secondary flex flex-col h-full items-center p-5 rounded-lg space-y-3 py-10 hover:bg-[#7C3AED]">
          <img
            src={serviceImg}
            alt="service-image"
            className="rounded-4xl p-2 bg-gray-400"
          />
          <h1 className="text-3xl font-bold text-white">Parcel Return</h1>
          <p className="flex-1 text-gray-400">
            Through our reverse logistics facility we allow end customers to
            return or exchange their products with online business merchants.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
