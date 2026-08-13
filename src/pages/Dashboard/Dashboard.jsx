import React, { useRef, useState } from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../../Components/Logo/Logo';
import Navbar from '../Shared/Navbar/Navbar';
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaCreditCard } from 'react-icons/fa6';

// Dock magnification tuning — tweak these to taste
const BASE_SIZE = 24;   // resting icon size in px
const MAX_SIZE = 42;    // icon size right under the cursor
const FALLOFF = 70;     // px radius of influence — smaller = punchier, more isolated bump

const Dashboard = () => {
    const itemRefs = useRef([]);
    // Icon sizes now live in state — computed inside the event handler (where
    // reading refs is legal) and never read from refs during render.
    const [iconSizes, setIconSizes] = useState([BASE_SIZE, BASE_SIZE, BASE_SIZE]);

    const handleMouseMove = (e) => {
        const mouseY = e.clientY;

        const sizes = itemRefs.current.map((el) => {
            if (!el) return BASE_SIZE;
            const rect = el.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
            const distance = Math.abs(mouseY - itemCenter);
            const ratio = Math.max(0, 1 - distance / FALLOFF);
            return BASE_SIZE + (MAX_SIZE - BASE_SIZE) * ratio;
        });

        setIconSizes(sizes);
    };

    const handleMouseLeave = () => {
        setIconSizes([BASE_SIZE, BASE_SIZE, BASE_SIZE]);
    };

    return (
        <div>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 text-3xl font-bold">Dashboard</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4 md:p-8">
                        <Outlet />
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="group flex min-h-full flex-col items-start bg-base-200 w-14 hover:w-64 transition-[width] duration-300 ease-in-out overflow-hidden"
                    >
                        {/* Sidebar content here */}
                        {/* List item */}

                        <ul className="menu w-full grow space-y-3">
                            <li ref={(el) => (itemRefs.current[0] = el)}>
                                <Link to='/' className="tooltip tooltip-right font-semibold whitespace-nowrap" data-tip="Home">
                                    {/* Home icon */}
                                    <FaHome
                                        className='shrink-0 transition-[font-size] duration-150 ease-out'
                                        style={{ fontSize: `${iconSizes[0]}px` }}
                                    />
                                    <span className="hidden group-hover:inline">Home</span>
                                </Link>
                            </li>
                            <li ref={(el) => (itemRefs.current[1] = el)}>
                                <Link to='/dashboard/my-parcels' className="tooltip tooltip-right font-semibold whitespace-nowrap" data-tip="My Parcels">
                                    {/* Home icon */}
                                    <CiDeliveryTruck
                                        className='shrink-0 transition-[font-size] duration-150 ease-out'
                                        style={{ fontSize: `${iconSizes[1]}px` }}
                                    />
                                    <span className="hidden group-hover:inline">My Parcels</span>
                                </Link>
                            </li>
                            <li ref={(el) => (itemRefs.current[2] = el)}>
                                <Link to='/dashboard/payment-history' className="tooltip tooltip-right font-semibold whitespace-nowrap" data-tip="Payment History">
                                    {/* Home icon */}
                                    <FaCreditCard
                                        className='shrink-0 transition-[font-size] duration-150 ease-out'
                                        style={{ fontSize: `${iconSizes[2]}px` }}
                                    />
                                    <span className="hidden group-hover:inline">Payment History</span>
                                </Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;