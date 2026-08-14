import React, { useRef, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHome, FaUsers } from "react-icons/fa";
import { FaCreditCard } from 'react-icons/fa6';
import { MdDeliveryDining, MdOutlineDirectionsBike } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import useRole from '../../hooks/useRole';

const BASE_SIZE = 24;
const MAX_SIZE = 42;
const FALLOFF = 70;

const Dashboard = () => {
    const itemRefs = useRef([]);

    const { role } = useRole();
   

    const [iconSizes, setIconSizes] = useState(
        Array(6).fill(BASE_SIZE)
    );

    const handleMouseMove = (e) => {
        const mouseY = e.clientY;

        const sizes = itemRefs.current.map((el) => {
            if (!el) return BASE_SIZE;

            const rect = el.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(mouseY - itemCenter);

            const ratio = Math.max(
                0,
                1 - distance / FALLOFF
            );

            return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * ratio;
        });

        setIconSizes(sizes);
    };

    const handleMouseLeave = () => {
        setIconSizes(Array(6).fill(BASE_SIZE));
    };

    return (
        <div>
            <div className="drawer lg:drawer-open">

                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />

                <div className="drawer-content">

                    <nav className="navbar w-full bg-base-300">

                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2"
                                fill="none"
                                stroke="currentColor"
                                className="my-1.5 inline-block size-4"
                            >
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                <path d="M9 4v16" />
                                <path d="M14 10l2 2l-2 2" />
                            </svg>
                        </label>

                        <div className="px-4 text-3xl font-bold">
                            Dashboard
                        </div>

                    </nav>

                    <div className="p-4 md:p-8">
                        <Outlet />
                    </div>

                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">

                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    />

                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="group flex min-h-full flex-col items-start bg-base-200 w-14 hover:w-64 transition-[width] duration-300 ease-in-out overflow-hidden"
                    >

                        <ul className="menu w-full grow space-y-3">

                            {/* Home */}
                            <li ref={(el) => (itemRefs.current[0] = el)}>
                                <Link
                                    to="/"
                                    className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                    data-tip="Home"
                                >
                                    <FaHome
                                        className="shrink-0 transition-[font-size] duration-150 ease-out"
                                        style={{ fontSize: `${iconSizes[0]}px` }}
                                    />
                                    <span className="hidden group-hover:inline">
                                        Home
                                    </span>
                                </Link>
                            </li>



                            {role === 'user' &&

                                <>
                                    {/* My Parcels */}
                                    <li ref={(el) => (itemRefs.current[1] = el)}>
                                        <Link
                                            to="/dashboard/my-parcels"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="My Parcels"
                                        >
                                            <CiDeliveryTruck
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[1]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                My Parcels
                                            </span>
                                        </Link>
                                    </li>

                                    {/* Payment History */}
                                    <li ref={(el) => (itemRefs.current[2] = el)}>
                                        <Link
                                            to="/dashboard/payment-history"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="Payment History"
                                        >
                                            <FaCreditCard
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[2]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                Payment History
                                            </span>
                                        </Link>
                                    </li>
                                </>

                            }

                            {
                                role === 'admin' &&

                                <>
                                    {/* Approve New Riders */}

                                    < li ref={(el) => (itemRefs.current[3] = el)}>
                                        <Link
                                            to="/dashboard/approve-riders"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="Approve New Riders"
                                        >
                                            <MdDeliveryDining
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[3]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                Approve New Riders
                                            </span>
                                        </Link>
                                    </li>

                                    {/* Current Riders */}
                                    <li ref={(el) => (itemRefs.current[4] = el)}>
                                        <Link
                                            to="/dashboard/current-riders"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="Current Riders"
                                        >
                                            <GrUserWorker
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[4]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                Current Riders
                                            </span>
                                        </Link>
                                    </li>

                                    {/* Manage Users */}
                                    <li ref={(el) => (itemRefs.current[5] = el)}>
                                        <Link
                                            to="/dashboard/manage-users"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="Manage Users"
                                        >
                                            <FaUsers
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[5]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                Manage Users
                                            </span>
                                        </Link>
                                    </li>



                                    {/* Assign Riders */}
                                    <li ref={(el) => (itemRefs.current[5] = el)}>
                                        <Link
                                            to="/dashboard/assign-riders"
                                            className="tooltip tooltip-right font-semibold whitespace-nowrap"
                                            data-tip="Assign Riders"
                                        >
                                            <MdOutlineDirectionsBike
                                                className="shrink-0 transition-[font-size] duration-150 ease-out"
                                                style={{ fontSize: `${iconSizes[5]}px` }}
                                            />
                                            <span className="hidden group-hover:inline">
                                                Assign Riders
                                            </span>
                                        </Link>
                                    </li>

                                </>
                            }




                        </ul>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;