import React, { useEffect } from "react";
import Hero from "../components/Hero";
import HeadlineCards from "../components/HeadlineCards";
import Food from "../components/Food";
import Category from "../components/Category";
import Navbar from "../components/shared/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../redux/user/userSlice";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser !== null) {
      axios
        .get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/order/${currentUser._id}/cart`,
        )
        .then((res) => {
          if (res.data.length !== 0) {
            dispatch(createCart(res.data[0]));
          }
        });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
    </div>
  );
};

export default Home;
