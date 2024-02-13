import React, { useEffect, useState } from "react";
import { data } from "../data/data.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Food = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState(data);
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(-1);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/food/?category=${category}&order=${price}`
      )
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {});
  }, [category, price]);

  const onCategoryChange = (e) => {
    setCategory(e.target.id);
  };

  const onPriceChange = (e) => {
    setPrice(e.target.id);
  };

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bolt text-4xl text-center">
        Top Rated Menu Items
      </h1>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="">
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-self-start flex-wrap">
            <button
              id="all"
              onClick={onCategoryChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            <button
              id="burger"
              onClick={onCategoryChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Burgers
            </button>
            <button
              id="pizza"
              onClick={onCategoryChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Pizza
            </button>
            <button
              id="salad"
              onClick={onCategoryChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Salads
            </button>
            <button
              id="chicken"
              onClick={onCategoryChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Chicken
            </button>
          </div>
        </div>
        <div className="">
          <p className="font-bold text-gray-700">Filter Price</p>
          <div className="flex justify-self-start max-w-[390px] w-full">
            <button
              id="1"
              onClick={onPriceChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $
            </button>
            <button
              id="-1"
              onClick={onPriceChange}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              $$$$
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {foods.map((item, index) => (
          <div
            className="border shadow-lg rounded-lg hover:scale-105 duration-300 cursor-pointer"
            key={index}
            onClick={() => navigate(`/details/${item._id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  {item.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
