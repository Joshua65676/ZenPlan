import React from 'react'
import Navbar from '../components/landingpage/Navbar'
import Hero from '../components/landingpage/Hero'
import HowItworks from '../components/landingpage/HowItworks'

const Home: React.FC = () => {
  return (
    <section>
      <Navbar />
      <Hero />
      <HowItworks />
    </section>
  )
}

export default Home