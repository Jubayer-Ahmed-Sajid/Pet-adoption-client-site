import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import useUserDetails from "./Hooks/useUserDetails";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import useAuth from "./Hooks/useAuth";

const DropDown = () => {
  const { data, isLoading } = useUserDetails();
  const { SignOutUser } = useAuth();
  if (isLoading) {
    return <h2>Loading...</h2>;
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
        console.log(error.message);
      });
  };
  return (
    <div>
      <Menu placement="bottom-end">
        <MenuHandler>
        <Button>
            <img src={data?.photo_url} className="h-12 w-12 rounded-full" alt="" />
        </Button>

        </MenuHandler>
        <MenuList className="z-20">
          <MenuItem>
            <Link
              to="/dashboard"
              className=" gap-2 mb-2 rounded-md mx-auto w-full items-center border-none flex px-2 py-2 text-xl hover:bg-blue-500 hover:text-white"
            >
              <MdOutlineDashboard className="text-xl " /> Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="flex items-center px-5 py-2 text-xl rounded-md mx-auto hover:bg-red-400 bg-red-500 text-white  hover:text-white"
              onClick={handleSignOut}
            >
              <GoSignOut /> Sign Out
            </button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default DropDown;
