import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci'
import useAuth from "../Components/Hooks/useAuth";
import Swal from "sweetalert2";

import { MdClose, MdMenu } from "react-icons/md";
const NavBar = () => {
    const { user, SignOutUser } = useAuth()
    const handleSignOut = () => {
        SignOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully logged out",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    const [menu, setMenuItem] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const navLinks =
        <>
            <li>
                <NavLink className= {({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black py-2 px-3  rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black md:ml-4 py-2 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/petlisting'>Pet Listing</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black md:ml-4 py-2 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/donationCampaign'>Campaigns</NavLink>
            </li>
            <li >
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black md:ml-4 py-2 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/signUp'>SignUp</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black py-2 md:ml-4 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/favorites'>Favorites</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-black py-2 md:ml-4 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md" 
                } to='/events'>Events</NavLink>
            </li>
        </>
    let [open, setOpen] = useState(false)
    const handleChange = () => {
        setMenuItem(!menu)
        console.log(menu)
    }
    return (
        <div className="text-white fixed z-10 w-full left-0 top-0 ">

            <nav className=" md:flex items-center shadow-md  max-w-7xl rounded-sm mx-auto justify-between md:px-8 px-5  bg-[#1e534e] ">
                <img src="https://i.ibb.co/1YV2bW0/cover-removebg-preview.png" className="h-16 w-28 object-cover" alt="" />
                {/* <div className="flex justify-between items-center px-4  py-4">
                
            </div> */}
                <div onClick={() => setOpen(!open)} className="text-3xl md:hidden absolute right-12 top-4 cursor-pointer">
                    {
                        open ? <MdClose></MdClose> : <MdMenu></MdMenu>
                    }


                </div>
                <ul className={`md:flex space-y-6 pt-3 md:pt-0 md:items-center md:space-y-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 bg-[#1e534e]   md:pb-0 pb-12 h-auto transition-all duration-500 ease-in ${open ? 'top-16' : 'top-[-450px]'} `}>
                   
                    {navLinks}

                    


                <div className={`text-white gap-2 flex flex-row-reverse  md:static justify-between mr-4 md:flex-row md:pb-0 pb-8 md:items-center `}>
                    {
                        user ? < > <p className="md:ml-12 text-gray-300 font-semibold">{user.displayName}</p>
                            <div className="relative inline-block text-left">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none  "
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        src={user.photoURL}
                                        className="w-12 h-12 rounded-full"
                                        alt=""
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute  left-0 mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg">
                                        <Link
                                            to="/dashboard"
                                            className="block px-4 py-2 text-xl text-gray-800 hover:bg-blue-500 hover:text-white"
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            type="button"
                                            className="block px-4 py-2 text-xl text-gray-800 hover:bg-red-500 hover:text-white"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </> : <Link to='/signup' className="bg-yellow-600 btn px-4 py-2 rounded-md">Sign In</Link>
                    }
                </div>
                </ul>

            </nav>
        </div>
    );
};

export default NavBar;
