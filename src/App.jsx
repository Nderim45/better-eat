import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HeadlineCards from "./components/HeadlineCards";
import Food from "./components/Food";
import Category from "./components/Category";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
      <Food />
      <Category />
    </div>
  );
}

export default App;
