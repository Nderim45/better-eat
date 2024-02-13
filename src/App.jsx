import { useState } from "react";
import Navbar from "./components/shared/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FoodDetails from "./pages/FoodDetails";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/details/:id" element={<FoodDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
