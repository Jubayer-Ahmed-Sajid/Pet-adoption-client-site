import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaDollarSign,
  FaHome,
  FaPaw,
  FaUsers,
  FaHeart,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdLogout, MdPets, MdPlaylistAddCheckCircle } from "react-icons/md";
import useUserDetails from "./Hooks/useUserDetails";
import useAuth from "./Hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
  const { data, isLoading } = useUserDetails();
  const { SignOutUser } = useAuth();

  if (isLoading) {
    return (
      <div className="p-6 text-sm text-muted animate-pulse motion-reduce:animate-none">
        Loading navigation…
      </div>
    );
  }

  const isAdmin = data?.isAdmin;

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-stock text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-accent text-accent-ink font-semibold shadow-sm"
        : "text-ink-2 hover:text-ink hover:bg-paper-2"
    }`;

  return (
    <aside className="bg-card border border-rule rounded-card p-5 m-3 min-h-[calc(100vh-24px)] flex flex-col justify-between shadow-sm">
      <div className="space-y-6">
        {/* User Profile Card */}
        <div className="p-4 rounded-stock bg-paper-2 border border-rule text-center">
          {data?.photo_url ? (
            <img
              src={data.photo_url}
              className="w-16 h-16 rounded-full mx-auto object-cover ring-2 ring-accent/60"
              alt={data?.name || "User avatar"}
            />
          ) : (
            <div className="w-16 h-16 rounded-full mx-auto bg-accent text-accent-ink font-display font-semibold text-xl flex items-center justify-center ring-2 ring-accent/60">
              {(data?.name || "Member").slice(0, 1).toUpperCase()}
            </div>
          )}
          <h4 className="font-display font-semibold text-ink text-base mt-2.5 truncate">
            {data?.name || "Active Member"}
          </h4>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-pill text-xs font-semibold text-muted bg-paper border border-rule">
            {isAdmin ? "Platform Admin" : "Volunteer Member"}
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          <NavLink to="/dashboard" end className={navItemClass}>
            <FaHome className="text-base shrink-0" />
            <span>Dashboard overview</span>
          </NavLink>

          {isAdmin ? (
            <>
              <span className="text-xs font-medium text-muted px-3 block mb-1">
                Admin moderation
              </span>
              <NavLink to="/dashboard/all-users" className={navItemClass}>
                <FaUsers className="text-base shrink-0" />
                <span>All users</span>
              </NavLink>
              <NavLink to="/dashboard/all-pets" className={navItemClass}>
                <FaPaw className="text-base shrink-0" />
                <span>All pets</span>
              </NavLink>
              <NavLink to="/dashboard/all-donations" className={navItemClass}>
                <FaDollarSign className="text-base shrink-0" />
                <span>All campaigns</span>
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-xs font-medium text-muted px-3 block mb-1">
                Your activities
              </span>
              <NavLink to="/dashboard/add-pet" className={navItemClass}>
                <MdPets className="text-base shrink-0" />
                <span>Add a pet</span>
              </NavLink>
              <NavLink to="/dashboard/added-pets" className={navItemClass}>
                <MdPlaylistAddCheckCircle className="text-base shrink-0" />
                <span>My listed pets</span>
              </NavLink>
              <NavLink to="/dashboard/adoption-request" className={navItemClass}>
                <FaHeart className="text-base shrink-0" />
                <span>Adoption requests</span>
              </NavLink>
              <NavLink to="/dashboard/create-donation" className={navItemClass}>
                <FaDollarSign className="text-base shrink-0" />
                <span>Start campaign</span>
              </NavLink>
              <NavLink to="/dashboard/created-donation" className={navItemClass}>
                <FaCalendarAlt className="text-base shrink-0" />
                <span>My campaigns</span>
              </NavLink>
            </>
          )}

          <div className="pt-4 mt-4 border-t border-rule space-y-1.5">
            <span className="text-xs font-medium text-muted px-3 block mb-1">
              Preferences
            </span>
            <ThemeToggle showLabel className="w-full justify-start px-3.5 py-2.5 rounded-stock text-xs font-medium bg-transparent border-0 hover:bg-paper-2" />
            <span className="text-xs font-medium text-muted px-3 block mt-3 mb-1">
              Navigation
            </span>
            <NavLink to="/" className={navItemClass}>
              <FaHome className="text-base shrink-0" />
              <span>Return home</span>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Logout Action */}
      <div className="pt-4 border-t border-rule">
        <button
          onClick={SignOutUser}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-pill bg-paper-2 hover:bg-paper-3 text-accent-3 text-xs font-semibold border border-rule transition-colors press-down"
        >
          <MdLogout />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
