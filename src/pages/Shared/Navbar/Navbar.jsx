import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {

  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => {
        console.log(error)
      })
  }

  console.log(user)
  const links = <>
    <li><NavLink className='font-semibold text-lg ' to={'/services'}>Services</NavLink></li>
    <li><NavLink className='font-semibold text-lg ' to={'/coverage'}>Coverage</NavLink></li>
    <li><NavLink className='font-semibold text-lg ' to={'/about'}>About Us</NavLink></li>
    <li><NavLink className='font-semibold text-lg ' to={'/pricing'}>Pricing</NavLink></li>
    <li><NavLink className='font-semibold text-lg ' to={'/send-parcel'}>Send Parcel</NavLink></li>
    <li><NavLink className='font-semibold text-lg ' to={'/dashboard/my-parcels'}>Dashboard</NavLink></li>

  </>
  return (
    <div className="pb-5 ">
      <div className="rounded-lg navbar bg-white shadow-sm p-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <NavLink to={'/'}><Logo></Logo></NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">

            {links}

          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          {user ?
            <NavLink to={'/'} onClick={handleLogOut} className='btn hover:bg-[#7C3AED] hover:text-white'>LogOut</NavLink>
            : <NavLink to={'/login'} className='btn hover:bg-[#7C3AED] hover:text-white'>Login</NavLink>
            }

            <Link className="btn text-white bg-[#7C3AED]" to={'/rider'}>Be a Rider</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
