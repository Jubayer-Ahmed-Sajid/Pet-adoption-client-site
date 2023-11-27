import { NavLink } from "react-router-dom";
import { useState } from 'react';
import {CiMenuBurger} from 'react-icons/ci'
const NavBar = () => {
    const [menu,setMenuItem] =useState(false)
    
    const navLinks = <>
        <li>
            <NavLink className='active:bg-black text-center hover:text-blue-600 text-red-400' to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/petlisting'>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink to='/donationCampaign'>Donation Campaign</NavLink>
        </li>
        <li >
            <NavLink to='/signUp'>SignUp</NavLink>
        </li>
    </>
    const handleChange =()=>{
    setMenuItem(!menu)
    console.log(menu)
    }
    return (
        <div className="w-full  bg-black z-10">
            <div className="flex justify-between bg-slate-500 px-4 h-16 py-4 w-full">
                <h2 className="text-red-500 flex justify-end lg:block w-full lg:w-1/2">Pet Adoption</h2>
                <ul className="hidden lg:flex justify-between w-1/2 text-white font-semibold">
                    {navLinks}
                </ul>
                <div className="lg:hidden fixed">

                <button className={`lg:hidden btn ml-10 text-3xl font-bold text-white text-center transform ${menu ? 'rotate-90 transition-transform duration-300 ease-in-out' : 'rotate-0 transition-transform duration-300 ease-in-out'} rounded-lg flex justify-end pb-4`} onClick={handleChange}> <CiMenuBurger></CiMenuBurger> </button>
                <ul className={`lg:hidden space-y-3 flex-col text-white font-semibold bg-slate-400 text-center  transform ${menu ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-900`}>
                    {
                        menu ? navLinks : ''
                    }
                </ul>
                </div>
            </div>

        </div>
    );
};

export default NavBar;