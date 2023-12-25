import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci'
import useAuth from "../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { FaHeart } from "react-icons/fa";
const NavBar = () => {
    const { user, SignOutUser } = useAuth()
    console.log(user)
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

    const navLinks = <>
        <li>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-black py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-3 hover:rounded-md"
            } to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-black py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-3 hover:rounded-md"
            } to='/petlisting'>Pet Listing</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-black py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-3 hover:rounded-md"
            } to='/donationCampaign'>Donation Campaign</NavLink>
        </li>
        <li >
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "bg-black py-2 px-3 rounded-md" : "hover:text-blue-700  hover:bg-slate-400 py-2 px-3 hover:rounded-md"
            } to='/signUp'>SignUp</NavLink>
        </li>
        <li>
            <NavLink to='favorites'>Favorites</NavLink>
        </li>
    </>
    const handleChange = () => {
        setMenuItem(!menu)
        console.log(menu)
    }
    return (
        <div className="z-10 w-full sticky flex h-full items-center justify-between px-4 bg-slate-500 ">
           <img src="https://i.ibb.co/RgXFFJW/2c791441-ac9f-411f-85a8-9fb6e8b834f0.jpg" className="h-20  w-28 object-cover" alt="" />
            <div className="flex justify-between bg-slate-500 px-4  py-4">
                <ul className="hidden gap-6 lg:flex justify-between text-white font-semibold">
                    {navLinks}
                </ul>
                <div className="lg:hidden fixed">

                    <button className={`lg:hidden btn text-3xl font-bold text-white text-center transform ${menu ? 'rotate-90  transition-transform duration-300 ease-in-out' : 'rotate-0 transition-transform duration-300 ease-in-out'} rounded-lg flex pb-4`} onClick={handleChange}> <CiMenuBurger></CiMenuBurger> </button>
                    <ul className={`lg:hidden flex-col text-emerald-400 bg-white font-semibold  text-center  transform ${menu ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-900`}>
                        {
                            menu ? <div className="space-y-4  pb-4">{navLinks}</div> : ''
                        }
                    </ul>
                </div>
            </div>
            <div className="text-white gap-3 flex justify-center items-center">
                {
                    user ? <> <p>{user.displayName}</p>
                        <Menu>
                            <MenuHandler>
                                <Button className="shadow-none bg-transparent hover:shadow-none">
                                    <img src={user.photoURL} className="w-12 h-12 rounded-[48px]" alt="" />
                                </Button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem className="mb-1 text-xl">
                                    <Link to='/dashboard'>Dashboard</Link>
                                </MenuItem>
                                <MenuItem className="text-xl" onClick={handleSignOut}>SignOut</MenuItem>
                            </MenuList>
                        </Menu>
                    </> : <Link to='/signup' className="bg-yellow-600 btn px-4 py-2 rounded-md">Sign In</Link>
                }
            </div>

        </div>
    );
};

export default NavBar;