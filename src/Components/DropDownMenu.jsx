import React from "react";
import useUserDetails from "./Hooks/useUserDetails";
import { MdLogout, MdPets, MdPlaylistAddCheckCircle } from "react-icons/md";
import {
  FaDollarSign,
  FaHome,
  FaPaw,
  FaUsers,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import useAuth from "./Hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const DropDownMenu = () => {
  const { data } = useUserDetails();
  const { SignOutUser } = useAuth();
  const isAdmin = data?.isAdmin;

  const itemClass = "flex items-center gap-2.5 text-sm font-medium text-ink hover:text-accent-3 transition-colors py-2";

  return (
    <div className="flex items-center justify-between">
      <Link className="font-display font-semibold text-lg text-ink" to={"/"}>
        Paws & <span className="text-accent-3">Hearts</span>
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Menu>
        <MenuHandler>
          {data?.photo_url ? (
            <img
              className="w-10 h-10 object-cover rounded-full ring-2 ring-accent cursor-pointer"
              src={data.photo_url}
              alt={data?.name || "User avatar"}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent text-accent-ink font-display font-semibold text-sm flex items-center justify-center ring-2 ring-accent cursor-pointer">
              {(data?.name || "U").slice(0, 1).toUpperCase()}
            </div>
          )}
        </MenuHandler>
        <MenuList className="bg-card border border-rule p-4 w-56 rounded-card shadow-card z-50">
          <div className="pb-2 mb-2 border-b border-rule">
            <p className="text-xs font-semibold text-ink">{data?.name}</p>
            <p className="text-[11px] text-muted truncate">{data?.email}</p>
          </div>

          <MenuItem className="p-0">
            <NavLink to="/dashboard" end className={itemClass}>
              <FaHome /> Dashboard Overview
            </NavLink>
          </MenuItem>

          {isAdmin ? (
            <>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/all-users" className={itemClass}>
                  <FaUsers /> All Users
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/all-pets" className={itemClass}>
                  <FaPaw /> All Pets
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/all-donations" className={itemClass}>
                  <FaDollarSign /> All Campaigns
                </NavLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/add-pet" className={itemClass}>
                  <MdPets /> Add a Pet
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/added-pets" className={itemClass}>
                  <MdPlaylistAddCheckCircle /> My Listed Pets
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/adoption-request" className={itemClass}>
                  <FaHeart /> Adoption Requests
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/create-donation" className={itemClass}>
                  <FaDollarSign /> Start Campaign
                </NavLink>
              </MenuItem>
              <MenuItem className="p-0">
                <NavLink to="/dashboard/created-donation" className={itemClass}>
                  <FaCalendarAlt /> My Campaigns
                </NavLink>
              </MenuItem>
            </>
          )}

          <div className="pt-2 mt-2 border-t border-rule space-y-1">
            <MenuItem className="p-0">
              <NavLink to="/" className={itemClass}>
                <FaHome /> Return Home
              </NavLink>
            </MenuItem>
            <MenuItem className="p-0">
              <button
                onClick={SignOutUser}
                className="w-full flex items-center gap-2 text-sm font-semibold text-accent-3 py-2 text-left"
              >
                <MdLogout /> Sign Out
              </button>
            </MenuItem>
          </div>
        </MenuList>
      </Menu>
      </div>
    </div>
  );
};

export default DropDownMenu;
