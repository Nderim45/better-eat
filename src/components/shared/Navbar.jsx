import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
  AiFillTag,
} from "react-icons/ai";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdFavorite, MdHelp } from "react-icons/md";
import { FaWallet, FaUserFriends } from "react-icons/fa";
import { PiSignOutLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUser } from "../../redux/user/userSlice";
import { Badge } from "@mui/material";

const Navbar = () => {
  const dispatch = useDispatch();

  const { currentUser, cart } = useSelector((state) => state.user);
  const [nav, setNav] = useState(false);

  const handleSignOut = () => {
    dispatch(signOutUser());
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      <div className="flex items-center ">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Better<span className="font-bold">Eat</span>
        </h1>
        {/* <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
          <p className="bg-black text-white rounded-full p-2">Delivery</p>
          <p className="p-2">Pickup</p>
        </div> */}
      </div>
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[180px] md:w-[350px] lg:w-[400px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 focus:outline-none w-full"
          type="text"
          placeholder="Search Foods"
        />
      </div>
      {currentUser ? (
        <div className="flex items-center gap-4">
          <Badge
            badgeContent={cart?.foods.length}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: "#ea580c",
              },
            }}
          >
            <button className="bg-black text-white flex items-center py-2 rounded-full">
              <BsFillCartFill size={20} className="mr-2" /> Cart
            </button>
          </Badge>
          <PiSignOutLight
            size={30}
            className="hover:cursor-pointer"
            onClick={handleSignOut}
          />
        </div>
      ) : (
        <div className="flex">
          <Link
            to="/sign-in"
            className="text-black hidden md:flex items-center px-4 py-2 border-hidden"
          >
            Sign In
          </Link>
          <Link
            to="sign-up"
            className="bg-black text-white hidden md:flex items-center px-4 py-2 rounded-full"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Mobile Menu */}

      {nav && (
        <div
          onClick={() => setNav(false)}
          className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"
        />
      )}

      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
          Better<span className="font-bold">Eat</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex">
              <TbTruckDelivery size={25} className="mr-4" />
              Orders
            </li>
            <li className="text-xl py-4 flex">
              <MdFavorite size={25} className="mr-4" />
              Favorites
            </li>
            <li className="text-xl py-4 flex">
              <FaWallet size={25} className="mr-4" />
              Wallet
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp size={25} className="mr-4" />
              Help
            </li>
            <li className="text-xl py-4 flex">
              <AiFillTag size={25} className="mr-4" />
              Promotions
            </li>
            <li className="text-xl py-4 flex">
              <BsFillSaveFill size={25} className="mr-4" />
              Best Ones
            </li>
            <li className="text-xl py-4 flex">
              <FaUserFriends size={25} className="mr-4" />
              Invite Friends
            </li>
          </ul>
        </nav>
        {!currentUser && (
          <div className="flex justify-around">
            <Link
              to="/sign-in"
              className="bg-orange-600 border-hidden text-white flex md:hidden items-center px-4 py-2 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-orange-600 border-hidden text-white flex md:hidden items-center px-4 py-2 rounded-lg"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
