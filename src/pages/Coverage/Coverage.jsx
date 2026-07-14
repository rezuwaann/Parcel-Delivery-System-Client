import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

// import boundary from 'bangladesh-geojson/src/data/bangladesh.geojson';
const Coverage = () => {

    const serviceCenters = useLoaderData()
    console.log(serviceCenters)
    const position = [23.9850, 90.3563];

    const mapRef = useRef()

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        const district = serviceCenters.find(center => center.district.toLowerCase().includes(location))
        console.log(district)
        console.log(location)
        if (location == '' || location == ' ') {
           mapRef.current.flyTo(position, 7)
        }
        else if (district) {
            const coord = [district.latitude, district.longitude];
            console.log(district, coord)


            // fly to the location
            mapRef.current.flyTo(coord, 14)
        }
    }

    return (
        <div className='text-center'>
            <h1 className='text-2xl lg:text-4xl font-bold my-2'>We Are Available in 64 Districts</h1>


            <div>

                <form onSubmit={handleSearch}>
                    <label className="input border-[#7C3AED] outline-[#7C3AED]">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input name='location' type="search" className="grow" placeholder="Enter the district name" />

                    </label>
                </form>


                <div className='flex justify-center mt-3'>
                    <MapContainer
                        className='h-150 w-100 md:w-150 lg:w-250'
                        center={position}
                        zoom={7}
                        scrollWheelZoom={false}
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />




                        {
                            serviceCenters.map(center =>
                                <Marker position={[center.latitude, center.longitude]}>
                                    <Popup>
                                        <div className="min-w-50  p-1">
                                            <h3 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-2 mb-2">
                                                {center.district}
                                            </h3>
                                            <div className="flex items-start gap-2">
                                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">
                                                    Service Area
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {center.covered_area.map((area, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        }
                    </MapContainer>,
                </div>
            </div>
        </div>
    );
};

export default Coverage;