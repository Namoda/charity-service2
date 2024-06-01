import React from 'react';
import bgImg from '../../../assets/home/banner-2.jpg';

const Hero2 = () => {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative min-h-screen flex flex-col justify-center items-center text-white p-8 md:p-16 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="space-y-6 max-w-3xl">
          <p className="md:text-4xl text-2xl font-semibold">Join Us</p>
          <h1 className="md:text-7xl text-4xl font-bold leading-tight">
            Kind Heart Charity Service
          </h1>
          <div className="md:w-full">
            <p className="text-lg md:text-xl">
              Kind Heart Donation & Charity Service is dedicated to spreading kindness through acts of
              generosity and support. We provide essential supplies, financial aid, and a listening ear
              to those in need. Join us in building a compassionate world where everyone has the opportunity
              to thrive and feel supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
