import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "../components/shared/GoogleAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = userData;
    if (userData.password === confirmPassword) {
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/signup`, rest)
        .then((res) => {
          if (res.data.success === true) navigate("/sign-in");
        })
        .catch((err) => {
          setError(err.response.data.message);
          setLoading(false);
        });
    } else {
      setError("Passwords do not match");
    }
  };

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
          <form onSubmit={handleOnSubmit} className="my-8 gap-6 px-10 pb-5">
            <div className="flex gap-4 py-4 ">
              <input
                id="firstname"
                name="firstname"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                onChange={handleChange}
              />
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 py-4 ">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 py-4 ">
              <input
                id="address"
                name="address"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Address"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="py-4">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 py-4">
              <button
                disabled={loading}
                className="bg-orange-600 border-hidden w-1/2 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? (
                  <CircularProgress size={20} style={{ color: "white" }} />
                ) : (
                  "Sign Up"
                )}
              </button>
              <button
                disabled={loading}
                onClick={() => navigate("/sign-in")}
                className="bg-white border-orange-600 w-1/2 text-orange-600 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-center py-2">
              <p>Or</p>
            </div>
            <GoogleAuth disabled={loading} />
          </form>
        </div>
      </div>
      <Snackbar
        autoHideDuration={3000}
        open={error ? true : false}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setError(null)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
