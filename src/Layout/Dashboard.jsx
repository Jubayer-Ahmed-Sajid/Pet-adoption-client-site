import { FaAd, FaDollarSign, FaDonate, FaHome, FaList, FaPaw, FaUsers} from "react-icons/fa";
import { MdPets,MdPlaylistAddCheck } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Components/Hooks/useAdmin";
import Sidebar from "../Components/Sidebar";

const DashBoard = () => {
    const [data,isLoading] = useAdmin()
    console.log(data)

    const isAdmin = data;
    console.log(isAdmin)


    return (
        <div className="grid grid-cols-9 gap-2">
            <div className="col-span-2">
                <Sidebar></Sidebar>
            </div>
            <div className="col-span-7">

            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
















