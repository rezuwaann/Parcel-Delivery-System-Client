import React from 'react';
import logo from '../../assets/logo2.png'
const Logo = () => {

    
    return (
        <div className='flex items-end'>
            <img src={logo} alt="" className='h-12 w-30'/>
            {/* <span className='text-3xl font-semibold -ms-2.5'>Uthao</span> */}
        </div>
    );
};

export default Logo;