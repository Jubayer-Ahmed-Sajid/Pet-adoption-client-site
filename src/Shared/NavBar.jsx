import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import useAuth from "../Components/Hooks/useAuth";
import logo from '../assets/Gemini_Generated_Image (3).jpg'

import { MdClose, MdMenu } from "react-icons/md";
import { Toaster, toast } from "sonner";
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
        const LoggingOut = toast.loading('Logging Out')
        SignOutUser()
            .then(() => {
                setTimeout(() => {
                    toast.dismiss(LoggingOut);
                    toast.success('Successfully Logged Out')
                }, 500);
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
                } to='/petlisting'>Pet Listing</NavLink>
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
            <Toaster richColors position="top-right"/>

            <nav className="flex items-center shadow-md  max-w-7xl rounded-sm mx-auto justify-between md:px-8 px-5">

                <div className="flex justify-start gap-2 lg:justify-center items-center">

                    <img src={logo} className="lg:h-16 h-12 w-12 lg:w-16 rounded-full object-cover" alt="" />
                    <h2 className="lg:text-2xl text-xl font-bold text-white">Paws & <span className="text-secondary">Hearts </span> </h2>
                </div>
                <ul className={`lg:flex space-y-6 pt-3 lg:pt-0 lg:items-center lg:space-y-0 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9  lg:pb-0 pb-12 h-auto   transition-all duration-500 ease-in ${open ? 'top-16 bg-black' : 'top-[-450px]'} `}>

                    {navLinks}

                </ul>

                <div className="flex items-center gap-4 ">
                    <div onClick={() => setOpen(!open)} className="text-3xl lg:hidden  cursor-pointer">
                        {
                            open ? <MdClose></MdClose> : <MdMenu></MdMenu>
                        }

                    </div>
                    <div className={`text-white gap-2 flex flex-row-reverse  md:static justify-between  lg:flex-row md:items-center `}>
                        {
                            user ? < > <p className="lg:ml-12 lg:block hidden text-gray-300 font-semibold">{user.displayName}</p>
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
                                        <div className="absolute  right-8 p-4 mt-2 space-y-2 bg-white border border-gray-200 rounded-md shadow-lg">
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
                            </> : <div className="flex w-full justify-start">
                                <NavLink className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-primary py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-2 hover:rounded-md"
                                } to='/signin'>Sign In</NavLink>
                            </div>
                        }
                    </div>



                </div>


            </nav>
        </div>
    );
};

export default NavBar;
