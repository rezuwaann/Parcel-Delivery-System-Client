import React from 'react';
import Logo from '../Components/Logo/Logo'
import authImage from '../../src/assets/authImage.png'
import { Outlet } from "react-router";
import Navbar from '../pages/Shared/Navbar/Navbar';
const AuthLayout = () => {
    return (
        
            <div className="max-w-7xl mx-auto min-h-screen ">
                <div>
                    {/* <Logo></Logo> */}
                    <Navbar></Navbar>
                </div>
                <div className='flex md:flex-row gap-20 p-10 h-full max-w-7xl mx-auto bg-white rounded-md'>
                    <div className='flex-1 lg:py-10'>
                        <Outlet></Outlet>
                    </div>

                    <div className='flex-1 hidden md:block bg-[#e2ebc7] rounded-xl p-0 py-auto md:flex md:items-center'>
                        <img src={authImage} alt="" />
                    </div>
                </div>
            </div>

        
    );
};

export default AuthLayout;