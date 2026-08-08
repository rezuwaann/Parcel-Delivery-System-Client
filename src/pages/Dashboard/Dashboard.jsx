import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../../Components/Logo/Logo';
import Navbar from '../Shared/Navbar/Navbar';
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { FaCreditCard } from 'react-icons/fa6';


const Dashboard = () => {
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
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        {/* List item */}

                        <ul className="menu w-full grow space-y-3">
                            <li>
                                <Link to='/' className="is-drawer-close:tooltip is-drawer-close:tooltip-right font-semibold" data-tip="Home">
                                    {/* Home icon */}
                                    <FaHome className=' text-2xl' />
                                    <span className="is-drawer-close:hidden">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/my-parcels' className="is-drawer-close:tooltip is-drawer-close:tooltip-right font-semibold" data-tip="My Parcels">
                                    {/* Home icon */}
                                    <CiDeliveryTruck className=' text-2xl' />
                                    <span className="is-drawer-close:hidden">My Parcels</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/payment-history' className="is-drawer-close:tooltip is-drawer-close:tooltip-right font-semibold" data-tip="Payment History">
                                    {/* Home icon */}
                                    <FaCreditCard className=' text-2xl' />
                                    <span className="is-drawer-close:hidden">Payment History</span>
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