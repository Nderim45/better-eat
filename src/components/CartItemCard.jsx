import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

const CartItemCard = ({ data, index, callBack }) => {
  const [foodDetails, setFoodDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BACKEND_URL}/food/${data.foodId}`)
      .then((res) => {
        if (res.status === 200) {
          setFoodDetails(res.data);
        }
      });
  }, []);

  return (
    <div className="w-full min-w-[900px] grid grid-cols-6 px-10 py-5 border-b-2">
      <div className="flex gap-4 items-center col-span-2">
        <div className="h-[100px] w-[100px]">
          <img
            src={foodDetails?.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{foodDetails?.name}</h1>
          {data.ingredients.length > 0 && (
            <p className="text-gray-600 text-sm">
              with {data.ingredients.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-gray-600 font-semibold">{data.size}</h1>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-gray-600 font-semibold">{data.quantity}</h1>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-gray-600 font-semibold">${data.price}</h1>
      </div>
      <div className="flex items-center justify-center">
        <FiTrash onClick={() => callBack(index)} />
      </div>
    </div>
  );
};

export default CartItemCard;
