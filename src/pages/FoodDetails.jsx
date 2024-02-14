import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import axios from "axios";

const FoodDetails = () => {
  const { id } = useParams();

  const [foodDetails, setFoodDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/food/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setFoodDetails(res.data);
          setPrice(res.data.price);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (foodDetails?.category === "pizza") {
      switch (size) {
        case "small":
          setPrice(foodDetails.price * quantity);
          break;
        case "medium":
          setPrice(Number(foodDetails.price * 1.25 * quantity).toFixed(2));
          break;
        case "large":
          setPrice(Number(foodDetails.price * 1.5 * quantity).toFixed(2));
          break;
      }
    }
    if (foodDetails?.category === "salad") {
      switch (size) {
        case "1":
          setPrice(foodDetails.price * quantity);
          break;
        case "3":
          setPrice(Number(foodDetails.price * 1.25 * quantity).toFixed(2));
          break;
        case "5":
          setPrice(Number(foodDetails.price * 1.5 * quantity).toFixed(2));
          break;
      }
    }
    if (
      foodDetails?.category === "chicken" ||
      foodDetails?.category === "burger"
    ) {
      setPrice(foodDetails.price * quantity);
    }
  }, [size, quantity]);

  const handleIngredientsClick = (e) => {
    if (ingredients.includes(e.target.innerText)) {
      setIngredients(ingredients.filter((item) => item !== e.target.innerText));
    } else {
      setIngredients([...ingredients, e.target.innerText]);
    }
  };

  return (
    <div className="max-h-screen md:overflow-hidden">
      <Navbar />
      <div className="flex flex-col w-full h-screen md:flex-row">
        <div className="md:w-1/2 md:sticky h-full">
          <img
            src={foodDetails.image}
            alt="food image"
            className="h-full w-full object-cover"
          />
        </div>
        <div className=" md:overflow-y-scroll mb-20 md:w-1/2 h-full px-10 py-4">
          <h1 className="text-4xl font-bold">{foodDetails.name}</h1>
          {foodDetails.category === "pizza" && (
            <p className="text-gray-600">
              with {foodDetails.ingredients.toString()}
            </p>
          )}
          <p className="text-2xl text-gray-600 mt-10 ">
            {foodDetails.description}
          </p>
          {foodDetails.category === "pizza" && (
            <div className="flex flex-wrap gap-5 my-5">
              <button
                onClick={() => setSize("small")}
                className={
                  size === "small"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                Small
              </button>
              <button
                onClick={() => setSize("medium")}
                className={
                  size === "medium"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                Medium
              </button>
              <button
                onClick={() => setSize("large")}
                className={
                  size === "large"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                Large
              </button>
            </div>
          )}
          {foodDetails.category === "burger" ||
            (foodDetails.category === "pizza" && (
              <div className="flex flex-wrap gap-5 my-5">
                <p className="text-black text-xl font-semibold w-full">
                  Choose Ingredients:
                </p>
                {foodDetails.ingredients.map((item, index) => (
                  <button
                    onClick={handleIngredientsClick}
                    className={
                      ingredients.includes(item)
                        ? "bg-orange-600 border-orange-600 text-white"
                        : "border-orange-600 text-orange-600"
                    }
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          {foodDetails.category === "salad" && (
            <div className="flex gap-5 my-5">
              <button
                onClick={() => setSize("1")}
                className={
                  size === "1"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                1 Person
              </button>
              <button
                onClick={() => setSize("3")}
                className={
                  size === "3"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                3 Persons
              </button>
              <button
                onClick={() => setSize("5")}
                className={
                  size === "5"
                    ? "bg-orange-600 border-orange-600 text-white"
                    : "border-orange-600 text-orange-600"
                }
              >
                5 Persons
              </button>
            </div>
          )}
          <div className="flex flex-col my-10 mb-20">
            <div className="flex justify-between mb-10 items-center border-2 rounded-full max-w-[120px]">
              <button
                disabled={quantity === 1}
                className="border-none "
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                className="border-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="flex">
              <button className="bg-black text-white px-5 py-2 rounded-full">
                Add To Cart
              </button>
              <p className="text-2xl ml-10">
                Price: <span className="font-semibold">${price}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
