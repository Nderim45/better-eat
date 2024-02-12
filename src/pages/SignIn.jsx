import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
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
        <div className="max-w-md w-full gap-8 bg-white rounded-lg">
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <form className="mt-8 gap-6 px-10 pb-5">
            <div className="py-4">
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
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
            <button className="bg-orange-600 border-hidden w-full text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Sign In
            </button>
          </form>
          <div className="flex justify-around items-center border-t border-gray h-[70px]">
            <Link to="/sign-up" className="text-blue-700 font-semibold">
              Don't have account?
            </Link>
            <Link className="text-gray-500 font-semibold">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
