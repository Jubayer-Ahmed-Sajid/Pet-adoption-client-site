import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaAd,
  FaDollarSign,
  FaDonate,
  FaHome,
  FaList,
  FaPaw,
  FaUsers,
} from "react-icons/fa";
import { MdLogout, MdPets, MdPlaylistAddCheckCircle } from "react-icons/md";
import useUserDetails from "./Hooks/useUserDetails";
import useAuth from "./Hooks/useAuth";

const Sidebar = () => {
  const { data, isLoading, refetch } = useUserDetails();
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  const { SignOutUser } = useAuth();
  const isAdmin = data?.isAdmin;
  return (
    <div className="bg-white shadow-lg rounded-md m-2 p-4  min-h-screen">
      <div className="flex flex-col gap-4 mb-4 mx-2 border-red-100 border-2 rounded-md py-3 items-center justify-center">
        <img
          src={data?.photo_url}
          className="w-20 h-20 rounded-full mt-5"
          alt=""
        />
        <p className="font-semibold my-3">{data?.name}</p>
      </div>
      <ul className="menu p-4 space-y-6">
        {isAdmin ? (
          <>
            <li>
              <NavLink
                to="/dashboard/all-users"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaUsers className="text-2xl text-blue-600"></FaUsers> All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-pets"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaPaw className="text-2xl text-blue-600"></FaPaw> All Pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-donations"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaDollarSign className="text-2xl text-blue-600"></FaDollarSign>All Donations
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/dashboard/add-pet"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaAd className="text-2xl text-blue-600"></FaAd> Add a Pet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/added-pets"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <MdPets className="text-2xl text-blue-600"></MdPets> My Added
                Pets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/adoption-request"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaAd className="text-2xl text-blue-600"></FaAd>Adoption Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/create-donation"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaDonate className="text-2xl text-blue-600"></FaDonate> Create
                Campaign
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/created-donation"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <MdPlaylistAddCheckCircle className="text-2xl text-blue-600"></MdPlaylistAddCheckCircle>
                My Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-donation"
                className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
              >
                <FaDollarSign className="text-2xl text-blue-600"></FaDollarSign>{" "}
                My Donation
              </NavLink>
            </li>
          </>
        )}
        <div className="divider"></div>
        {/* Shared Routes */}
        <hr />
        <li>
          <NavLink
            to="/"
            className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
            <FaHome className="text-2xl text-blue-600"></FaHome> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pet-listing"
            className="flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
            <FaList className="text-2xl text-blue-600"></FaList> Pets
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => SignOutUser()}
            className="flex bg-red-500 px-3 py-2 rounded-md text-white items-center gap-3 transition-all duration-300 transform hover:scale-105"
          >
            <MdLogout className="text-2xl "></MdLogout> SignOut
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
