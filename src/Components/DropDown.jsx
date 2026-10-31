import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import useUserDetails from "./Hooks/useUserDetails";
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import useAuth from "./Hooks/useAuth";
import Swal from "sweetalert2";

const DropDown = () => {
  const { data, isLoading } = useUserDetails();
  const { SignOutUser } = useAuth();

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full bg-paper-2 animate-pulse" />;
  }

  const handleSignOut = () => {
    SignOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Sign out error:", error.message);
      });
  };

  const photo = data?.photo_url || null;

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <button
          aria-label="User Profile Menu"
          className="p-0.5 rounded-full ring-2 ring-accent/60 hover:ring-accent transition-colors focus:outline-none"
        >
          {photo ? (
            <img
              src={photo}
              className="h-9 w-9 rounded-full object-cover"
              alt={data?.name || "User profile"}
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-accent text-accent-ink font-display font-semibold text-sm flex items-center justify-center">
              {(data?.name || "U").slice(0, 1).toUpperCase()}
            </div>
          )}
        </button>
      </MenuHandler>
      <MenuList className="z-50 bg-card border border-rule p-3 w-52 rounded-card shadow-card">
        <div className="px-2 py-1.5 mb-1.5 border-b border-rule">
          <p className="text-xs font-semibold text-ink truncate">{data?.name}</p>
          <p className="text-[11px] text-muted truncate">{data?.email}</p>
        </div>

        <MenuItem className="p-0">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-stock text-xs font-medium text-ink hover:bg-paper-2 hover:text-ink transition-colors w-full"
          >
            <MdOutlineDashboard className="text-sm" />
            <span>Dashboard</span>
          </Link>
        </MenuItem>

        <MenuItem className="p-0 mt-1">
          <button
            type="button"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-stock text-xs font-semibold text-accent-3 hover:bg-paper-2 transition-colors w-full text-left"
            onClick={handleSignOut}
          >
            <MdLogout className="text-sm" />
            <span>Sign Out</span>
          </button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DropDown;
