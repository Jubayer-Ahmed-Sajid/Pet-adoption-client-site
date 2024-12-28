import { FaAd, FaDollarSign, FaDonate, FaHome, FaList, FaPaw, FaUsers} from "react-icons/fa";
import { MdPets,MdPlaylistAddCheck } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";
import Sidebar from "../Components/Sidebar";
import DropDownMenu from "../Components/DropDownMenu";

const DashBoard = () => {
    const [data,isLoading] = useAdmin()
    console.log(data)

    const isAdmin = data;
    console.log(isAdmin)


    return (
        <div className="md:grid grid-cols-10 gap-2">
            <div className="col-span-2 hidden lg:block">
                <Sidebar></Sidebar>
            </div>
            <div className="lg:hidden">
                <DropDownMenu></DropDownMenu>
            </div>
            <div className="col-span-8">

            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
















