import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import CartItemCard from "../components/CartItemCard";
import { updateCart } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(null);
  const [discount, setDiscount] = useState(0);

  const { cart } = useSelector((state) => state.user);

  useEffect(() => {
    cart.foods.map((item) => {
      setTotalPrice((prev) => prev + item.price);
    });
  }, []);

  const deleteCartItem = (index) => {
    const newCartItems = {
      ...cart,
      foods: cart.foods.filter((item, i) => i !== index),
    };
    axios
      .patch(`${import.meta.env.VITE_APP_BACKEND_URL}/order/${cart._id}`, {
        foods: newCartItems.foods,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(updateCart(newCartItems));
          window.location.reload();
        }
      });
  };

  return (
    <div className="w-full min-h-screen px-10 bg-gray-100">
      <Navbar />
      <h1 className="text-3xl font-semibold py-5">Cart Products:</h1>
      {cart.foods.length > 0 ? (
        <div className="flex gap-4">
          <div className="w-2/3  bg-white rounded-xl">
            <div className="w-full grid grid-cols-6 pt-10 pb-5 px-5 border-b-2 border-black">
              <div className="flex col-span-2">
                <h1 className="text-xl font-semibold ">Product</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold">Size</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold">Quantity</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold">Price</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-xl font-semibold">Trash</h1>
              </div>
            </div>
            <div className="">
              {cart.foods.map((item, index) => (
                <CartItemCard
                  data={item}
                  index={index}
                  callBack={deleteCartItem}
                />
              ))}
            </div>
          </div>
          <div className="w-1/3 bg-white rounded-lg">
            <div className="flex justify-center items-center pt-8 pb-3 px-5">
              <h1 className="text-3xl font-semibold">
                Order ({cart.foods.length} items)
              </h1>
            </div>
            <div className="flex flex-col px-10">
              <h1>Gift Card</h1>
              <div className="flex gap-4 mt-3">
                <input
                  type="text"
                  placeholder="Write Discount Code"
                  className="appearance-none rounded-lg relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                />
                <button>Apply</button>
              </div>
              <div className="flex flex-col mt-5 border py-2 rounded-xl">
                <div className="flex justify-between py-3 px-2">
                  <h1>Subtotal:</h1>
                  <h1>{totalPrice}</h1>
                </div>
                <div className="flex justify-between py-3 px-2 bg-gray-200">
                  <h1>Transport:</h1>
                  <h1>{cart.foods.length > 5 ? "Free" : "$5"}</h1>
                </div>
                <div className="flex justify-between py-3 px-2">
                  <h1>Tax:</h1>
                  <h1>${Math.round(totalPrice * 0.18 * 1e2) / 1e2}</h1>
                </div>
                <div className="flex justify-between py-3 px-2 bg-gray-200">
                  <h1>Discount:</h1>
                  <h1>{discount ? discount : "-"}</h1>
                </div>
                <div className="flex justify-between py-3 px-2">
                  <h1 className="text-xl font-semibold">Total:</h1>
                  <h1 className="text-xl font-semibold text-orange-600">
                    ${totalPrice - discount}
                  </h1>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-600 border-hidden w-full text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mt-5"
              >
                Procced
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold">No items in cart</h1>
        </div>
      )}
    </div>
  );
};

export default Cart;
