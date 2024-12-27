import React from "react";
import useUserDetails from "./Hooks/useUserDetails";
import { MdLogout, MdPets, MdPlaylistAddCheckCircle } from "react-icons/md";
import {
  FaAd,
  FaDollarSign,
  FaDonate,
  FaHome,
  FaList,
  FaPaw,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";


const DropDownMenu = () => {
  const { data, isLoading } = useUserDetails();
  const isAdmin = data?.isAdmin;
  return (
    
    <div className="flex items-center justify-between m-3">
        <Link className="text-red-600 font-semibold" to ={'/'}>Paws and Hearts</Link>

        <Menu className="dropdown dropdown">
          <MenuHandler className="w-12 h-12 object-cover rounded-full">
            <img
              className="w-12 h-12 object-cover rounded-full"
              src={data?.photo_url}
              alt=""
            />
          </MenuHandler>
          <MenuList
          
            className="dropdown-content menu  p-6 w-64 space-y-4 rounded-box z-[1] shadow"
          >
            {isAdmin ? (
              <>
                <MenuItem>
                  <NavLink
                    to="/dashboard/allusers"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaUsers className="text-2xl "></FaUsers> All Users
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/allpets"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaPaw className="text-2xl"></FaPaw> All Pets
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/all-donations"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaDollarSign className="text-2xl"></FaDollarSign>All
                    Donations
                  </NavLink>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <NavLink
                    to="/dashboard/add-pet"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaAd className="text-2xl text-blue-600"></FaAd> Add a Pet
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/added-pets"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <MdPets className="text-2xl text-blue-600"></MdPets> My Added
                    Pets
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/adoption-request"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaAd className="text-2xl text-blue-600"></FaAd>Adoption
                    Request
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/create-donation"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaDonate className="text-2xl text-blue-600"></FaDonate>{" "}
                    Create Campaign
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/created-donation"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <MdPlaylistAddCheckCircle className="text-2xl text-blue-600"></MdPlaylistAddCheckCircle>
                    My Campaigns
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink
                    to="/dashboard/my-donation"
                    className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaDollarSign className="text-2xl text-blue-600"></FaDollarSign>{" "}
                    My Donation
                  </NavLink>
                </MenuItem>
              </>
            )}
            <div className="divider"></div>
            {/* Shared Routes */}
            <hr />
            <MenuItem>
              <NavLink
                to="/"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaHome className="text-2xl text-blue-600"></FaHome> Home
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/pet-listing"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaList className="text-2xl text-blue-600"></FaList> Pets
              </NavLink>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => SignOutUser()}
                className="flex bg-red-500 px-3 py-2 rounded-md text-white items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <MdLogout className="text-2xl "></MdLogout> SignOut
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
    
    </div>
  );
};

export default DropDownMenu;
