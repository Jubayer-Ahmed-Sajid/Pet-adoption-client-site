import { Link, NavLink } from "react-router-dom";
import {  useState } from 'react';
import { CiMenuBurger } from 'react-icons/ci'
import useAuth from "../Components/Hooks/useAuth";
import Swal from "sweetalert2";
const NavBar = () => {
    const {user,SignOutUser} = useAuth()
    console.log(user)
    const handleSignOut=()=>{
        SignOutUser()
        .then(()=>{
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully logged out",
                showConfirmButton: false,
                timer: 1500
              });
        })
        .catch((error)=>{
            console.log(error.message)
        })

    }

    const [menu, setMenuItem] = useState(false)

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
    const handleChange = () => {
        setMenuItem(!menu)
        console.log(menu)
    }
    return (
        <div className="w-full flex items-center justify-between px-4 bg-slate-500 z-10">
            <h2 className="text-red-500 flex justify-end lg:block">Pet Adoption</h2>
            <div className="flex justify-between bg-slate-500 px-4 h-16 py-4">
                <ul className="hidden gap-6 lg:flex justify-between text-white font-semibold">
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
            <div className="text-white gap-3 flex justify-center items-center">
                        {
                            user ?<> <button onClick={handleSignOut} className="bg-yellow-600 btn px-4 py-2 rounded-md">SignOut</button> <p>{user.displayName}</p>
                            <img src={user.photoURL} className="w-12 rounded-full" alt="" /></> : <Link to='/signup' className="bg-yellow-600 btn px-4 py-2 rounded-md">Sign In</Link>
                        }
            </div>

        </div>
    );
};

export default NavBar;