import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { TbBrandCashapp } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteCart } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, cart } = useSelector((state) => state.user);

  const [step, setStep] = useState(1);
  const [userAddress, setUserAddress] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setcardDetails] = useState({});
  const [newAddress, setNewAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cart) navigate("/cart");
    if (loading === true) {
      const timeout = setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleCardDetailsChange = (e) => {
    setcardDetails({
      ...cardDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`${import.meta.env.VITE_APP_BACKEND_URL}/order/${cart._id}`, {
        status: "progress",
        address: newAddress || cart.address,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(deleteCart());
          setLoading(true);
        }
      });
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };

  const handleAddressSubmit = (e) => {
    if (userAddress === true) {
      setStep(2);
    } else {
      if (newAddress !== null) {
        setStep(2);
      }
    }
  };

  return (
    <div className="w-full min-h-screen  bg-gray-100">
      <Navbar />
      {!loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-full px-5 md:w-2/3">
            <Accordion expanded={step === 1} disabled={step !== 1}>
              <AccordionSummary>
                <h1>Address</h1>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex ">
                  <label htmlFor="" className="mr-10">
                    <input
                      type="checkbox"
                      name="address"
                      id="address"
                      checked={!userAddress}
                      onChange={() => setUserAddress(false)}
                    />{" "}
                    Use different address for delivery
                  </label>
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      name="address"
                      id="address"
                      checked={userAddress}
                      onChange={() => setUserAddress(true)}
                    />{" "}
                    Use user address for delivery
                  </label>
                </div>
                {!userAddress && (
                  <div className="flex mt-10">
                    <input
                      required
                      type="text"
                      placeholder="Enter your address"
                      className="appearance-none rounded-lg relative block w-1/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none  focus:border-orange-500 focus:z-10 sm:text-sm"
                      onChange={(e) => setNewAddress(e.target.value)}
                    />
                  </div>
                )}
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    onClick={handleAddressSubmit}
                    className="bg-orange-500 text-white px-5 py-2 border-0"
                  >
                    Next
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={step === 2} disabled={step !== 2}>
              <AccordionSummary>Pyment Method</AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={
                      paymentMethod === "card"
                        ? "flex justify-between items-center w-full p-5 hover:cursor-pointer border-2 rounded-lg border-orange-600"
                        : "flex justify-between items-center w-full p-5 hover:cursor-pointer border-2 rounded-lg"
                    }
                  >
                    <h1 className="text-2xl font-semibold">Pay with card</h1>
                    <div className="flex items-center gap-4">
                      <FaCcVisa size={40} />
                      <FaCcMastercard size={40} />
                      <SiAmericanexpress size={30} />
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={
                      paymentMethod === "cash"
                        ? "flex justify-between items-center w-full p-5 hover:cursor-pointer border-2 rounded-lg border-orange-600"
                        : "flex justify-between items-center w-full p-5 hover:cursor-pointer border-2 rounded-lg"
                    }
                  >
                    <h1 className="text-2xl font-semibold">Pay with cash</h1>
                    <TbBrandCashapp size={40} />
                  </div>
                </div>
                <div className="flex justify-between mt-10">
                  <button
                    onClick={() => setStep(1)}
                    className="border-2 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() =>
                      paymentMethod === "card" ? setStep(3) : setStep(4)
                    }
                    className="bg-orange-500 text-white px-5 py-2 border-0"
                  >
                    Next
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={step === 3} disabled={step !== 3}>
              <AccordionSummary>Card Details</AccordionSummary>
              <AccordionSummary>
                <div className="w-full">
                  <form
                    className="flex flex-col items-center w-full"
                    onSubmit={handleCardSubmit}
                  >
                    <div className="flex flex-col max-w-md space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name on Card
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="John Doe"
                          onChange={handleCardDetailsChange}
                          value={cardDetails.name}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="number"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Card Number
                        </label>
                        <input
                          type="text"
                          pattern="[0-9]{16}"
                          name="number"
                          id="number"
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="1234 5678 1234 5678"
                          onChange={handleCardDetailsChange}
                          value={cardDetails.number}
                          required
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="expiry"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiry"
                            id="expiry"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="MM/YY"
                            onChange={handleCardDetailsChange}
                            value={cardDetails.expiry}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="cvc"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CVC
                          </label>
                          <input
                            type="text"
                            name="cvc"
                            id="cvc"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="123"
                            onChange={handleCardDetailsChange}
                            value={cardDetails.cvc}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between w-full mt-10">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="border-2 font-semibold"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="bg-orange-500 text-white px-5 py-2 border-0"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </AccordionSummary>
            </Accordion>
            <Accordion expanded={step === 4} disabled={step !== 4}>
              <AccordionSummary>Order Summary</AccordionSummary>
              <AccordionDetails>
                <div className="flex">
                  <div className="flex flex-col w-1/2">
                    <h1 className="text-xl font-semibold mb-5">
                      Delivery Details
                    </h1>
                    <h1>
                      {currentUser.firstname} {currentUser.lastname}
                    </h1>
                    <h1>{currentUser.phone}</h1>
                    <h1>{newAddress ? newAddress : currentUser.address}</h1>
                  </div>
                  {cardDetails.name && (
                    <div className="flex flex-col w-1/2">
                      <h1 className="text-xl font-semibold mb-5">
                        Card Details
                      </h1>
                      <h1>Card Holder: {cardDetails.name}</h1>
                      <h1>Card Number: {cardDetails.number}</h1>
                      <h1>Expiry Date: {cardDetails.expiry}</h1>
                      <h1>CVC: {cardDetails.cvc}</h1>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-10">
                  <button
                    onClick={() =>
                      paymentMethod === "card" ? setStep(3) : setStep(2)
                    }
                    className="border-2 font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-orange-500 text-white px-5 py-2 border-0"
                  >
                    Place Order
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center h-screen mt-10">
          <h1 className="text-3xl font-semibold">
            Product Ordered Successfully
          </h1>
          <h1 className="text-3xl font-semibold">Please Wait...</h1>
        </div>
      )}
    </div>
  );
};

export default Checkout;
