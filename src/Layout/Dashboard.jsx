import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {

    const isAdmin = true;


    return (
        <div className="flex">
            <div className="w-60 bg-orange-400 min-h-screen">
                <ul className="menu p-4 space-y-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard'>
                                  <span  className="flex items-center gap-2"> <h2> <FaHome></FaHome></h2> <p>Admin Home</p> </span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allusers'>
                                    <FaUtensils></FaUtensils> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allpets">
                                    <FaBook></FaBook> All Pets
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/alldonations">
                                    <FaUsers></FaUsers>All Donations
                                </NavLink>
                            </li>

                        </> : <>
                            <li>
                                <NavLink to='/dashboard'>
                                    <FaHome></FaHome> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addpet'>
                                    <FaCalendar></FaCalendar> Add a Pet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addedpets">
                                    <FaShoppingCart></FaShoppingCart> My Added Pets({cart.length})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/adoptionrequest">
                                    <FaAd></FaAd>Adoption Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="dashboard/createdonation">
                                    <FaList></FaList> Create Donation Campaign
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="dashboard/mydonation">
                                    <FaList></FaList> My Donation
                                </NavLink>
                            </li>
                        </>
                    }
                    <div className="divider"></div>
                    {/* Shared Routes */}
                    <li>
                        <NavLink to='/'>
                            <FaHome></FaHome>  Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/pets'>
                            <FaSearch></FaSearch>  Pets
                        </NavLink>
                    </li>
                </ul>

            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoard;