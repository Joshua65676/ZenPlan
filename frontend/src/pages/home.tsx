import React from 'react'
import Navbar from '../components/landingpage/Navbar'
import Hero from '../components/landingpage/Hero'
import HowItworks from '../components/landingpage/HowItworks'
import Features from '../components/landingpage/Features'
import Testimonial from '../components/landingpage/Testimonial'

const Home: React.FC = () => {
  return (
    <section>
      <Navbar />
      <Hero />
      <HowItworks />
      <Features />
      <Testimonial />
    </section>
  )
}

export default Home