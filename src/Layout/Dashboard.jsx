import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";

const DashBoard = () => {
    const [data,isLoading] = useAdmin()
    console.log(data)

    const isAdmin = data;
    console.log(isAdmin)


    return (
        <div className="flex">
            <div className="w-60 bg-slate-400 min-h-screen">
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard' className='flex items-center gap-2'>
                                  <span  className="flex items-center gap-2"> <h2> <FaHome className="text-2xl"></FaHome></h2> <p>Admin Home</p> </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allusers' className='flex items-center gap-2'>
                                    <FaUtensils className="text-2xl"></FaUtensils> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allpets" className='flex items-center gap-2'>
                                    <FaBook className="text-2xl"></FaBook> All Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/alldonations" className='flex items-center gap-2'>
                                    <FaUsers className="text-2xl"></FaUsers>All Donations
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
                                    <FaCalendar className="text-2xl"></FaCalendar> Add a Pet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addedpets" className='flex items-center gap-2'>
                                    <FaShoppingCart className="text-2xl"></FaShoppingCart> My Added Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adoptionrequest" className='flex items-center gap-2'>
                                    <FaAd className="text-2xl"></FaAd>Adoption Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createdonation" className='flex items-center gap-2'>
                                    <FaList className="text-2xl"></FaList> Create Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/createddonation" className='flex items-center gap-2'>
                                    <FaList className="text-2xl"></FaList>My Created Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mydonation" className='flex items-center gap-2'>
                                    <FaList className="text-2xl"></FaList> My Donation
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
                        <NavLink to='/pets' className='flex items-center gap-2'>
                            <FaSearch className="text-2xl"></FaSearch>  Pets
                        </NavLink>
                    </li>
                </ul>

            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoard;
















