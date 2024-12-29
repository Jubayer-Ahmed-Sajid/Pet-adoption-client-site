import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci'
import useAuth from "../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import logo from '../assets/Gemini_Generated_Image (3).jpg'

import { MdClose, MdMenu } from "react-icons/md";
import DropDown from "../Components/DropDown";
const NavBar = () => {
    const { user, SignOutUser } = useAuth()
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY >= 64) {
            setIsScrolled(true)

        }
        else setIsScrolled(false)
    }
    window.addEventListener('scroll', handleScroll)

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
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-primary md:ml-4 py-2 px-3  rounded-md" : "hover:text-blue-700  md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/'>Home</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-primary md:ml-4 py-2 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/pet-listing'>Pet Listing</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-primary md:ml-4 py-2 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/donationCampaign'>Campaigns</NavLink>
            </li>

            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-primary py-2 md:ml-4 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/favorites'>Favorites</NavLink>
            </li>
            <li>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-primary py-2 md:ml-4 px-2 rounded-md" : "hover:text-blue-700 md:ml-4 hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                } to='/events'>Events</NavLink>
            </li>
        </>
    let [open, setOpen] = useState(false)
    const handleChange = () => {
        setMenuItem(!menu)
        console.log(menu)
    }
    return (
        <div className={`h-16   z-10 fixed text-white top-0 left-0 w-full transition-all
              ${isScrolled ? "bg-black/70" : "bg-black"}`
        }
        >

            <nav className=" lg:flex items-center shadow-md  max-w-7xl rounded-sm mx-auto justify-between md:px-8 px-5">
                <div className="flex justify-start gap-2 lg:justify-center items-center">

                    <img src={logo} className="lg:h-16 mt-2 lg:mt-0 h-12 w-12 lg:w-16 rounded-full object-cover" alt="" />
                    <h2 className="lg:text-2xl text-xl font-bold text-white">Paws & <span className="text-secondary">Hearts </span> </h2>
                </div>

                <div onClick={() => setOpen(!open)} className="text-3xl lg:hidden absolute right-12 top-4 cursor-pointer">
                    {
                        open ? <MdClose></MdClose> : <MdMenu></MdMenu>
                    }

                </div>
                <ul className={`lg:flex space-y-6 pt-3 lg:pt-0 lg:items-center lg:space-y-0 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9  lg:pb-0 pb-12 h-auto   transition-all duration-500 ease-in ${open ? 'top-16 bg-black' : 'top-[-450px]'} `}>

                    {navLinks}

                    <div className={`text-white gap-2 flex flex-row-reverse  md:static justify-between mr-4 lg:flex-row md:pb-0 pb-8 md:items-center `}>
                        {
                            user ? < > <p className="lg:ml-12 ml-4 text-gray-300 font-semibold">{user.displayName}</p>
                               <DropDown></DropDown>
                            </> : <div className="flex w-full justify-start">
                            <NavLink className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-primary py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                            } to='/signin'>Sign In</NavLink>
                            </div>
                        }
                    </div>

                </ul>

            </nav>
        </div>
    );
};

export default NavBar;
