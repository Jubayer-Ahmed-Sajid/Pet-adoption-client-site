import { FaAd, FaDollarSign, FaDonate, FaHome, FaList, FaPaw, FaUsers} from "react-icons/fa";
import { MdPets,MdPlaylistAddCheck } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";

const DashBoard = () => {
    const [data,isLoading] = useAdmin()
    console.log(data)

    const isAdmin = true;
    console.log(isAdmin)


    return (
        <div className="flex">
            <div className="w-60 bg-slate-400 min-h-screen">
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard/allusers' className='flex items-center gap-2'>
                                  <span  className="flex items-center gap-2"> <h2> <FaHome className="text-2xl"></FaHome></h2> <p>Admin Home</p> </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allusers' className='flex items-center gap-2'>
                                    <FaUsers className="text-2xl"></FaUsers> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allpets" className='flex items-center gap-2'>
                                    <FaPaw className="text-2xl"></FaPaw> All Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/alldonations" className='flex items-center gap-2'>
                                    <FaDollarSign className="text-2xl"></FaDollarSign>All Donations
                                </NavLink>
                            </li>

                        </> : <>
                            <li>
                                <NavLink to='/dashboard' className='flex items-center gap-2'>
                                    <FaHome className="text-2xl"></FaHome> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addpet' className='flex items-center gap-2'>
                                    <FaAd className="text-2xl"></FaAd> Add a Pet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addedpets" className='flex items-center gap-2'>
                                    <MdPets className="text-2xl"></MdPets> My Added Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adoptionrequest" className='flex items-center gap-2'>
                                    <FaAd className="text-2xl"></FaAd>Adoption Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createdonation" className='flex items-center gap-2'>
                                    <FaDonate className="text-2xl"></FaDonate> Create Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createddonation" className='flex items-center gap-2'>
                                    <MdPlaylistAddCheck className="text-2xl"></MdPlaylistAddCheck>My Created Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mydonation" className='flex items-center gap-2'>
                                    <FaDollarSign className="text-2xl"></FaDollarSign> My Donation
                                </NavLink>
                            </li>
                        </>
                    }
                    <div className="divider"></div>
                    {/* Shared Routes */}
                    <hr />
                    <li>
                        <NavLink to='/' className='flex items-center gap-2'>
                            <FaHome className="text-2xl"></FaHome>  Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/petlisting' className='flex items-center gap-2'>
                            <FaList className="text-2xl"></FaList>  Pets
                        </NavLink>
                    </li>
                </ul>

            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoard;
















