import React from 'react'
import Hero from '../components/Hero';
import HeadlineCards from '../components/HeadlineCards';
import Food from '../components/Food';
import Category from '../components/Category';
import Navbar from '../components/shared/Navbar';

const Home = () => {
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

export default Home