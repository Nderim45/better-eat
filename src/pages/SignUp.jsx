import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/shared/GoogleAuth";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row h-[100vh]">
      <div className="h-full w-1/2 hidden md:flex relative">
        <div className="absolute w-full h-full bg-black/20" />
        <img
          className="h-full w-full object-cover"
          src="https://images.pexels.com/photos/3220617/pexels-photo-3220617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="SignIn Image"
        />
      </div>
      <div className="min-h-screen flex w-full md:w-1/2 items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full gap-8 bg-white rounded-lg">
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Create account
          </h2>
          <form className="my-8 gap-6 px-10 pb-5">
            <div className="flex gap-4 py-4 ">
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div className="flex gap-4 py-4 ">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="flex gap-4 py-4 ">
              <input
                id="phone"
                name="phone"
                type="number"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div className="py-4">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="py-4">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex gap-4 py-4">
              <button className="bg-orange-600 border-hidden w-1/2 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                Sign Up
              </button>
              <button
                onClick={() => navigate("/sign-in")}
                className="bg-white border-orange-600 w-1/2 text-orange-600 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-center py-2">
              <p>Or</p>
            </div>
            <GoogleAuth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
