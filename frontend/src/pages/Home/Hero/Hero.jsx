import React, { useEffect } from 'react';
import bgImg from '../../../assets/home/banner-1.jpg';

const Hero = () => {
  useEffect(() => {
    const words = document.querySelectorAll('.animate-words span');
    words.forEach((word, index) => {
      word.style.animationDelay = `${index * 0.05}s`; // Faster animation delay
    });
  }, []);

  const text = "Kind Heart Donation & Charity Service is dedicated to spreading kindness through acts of generosity and support. We provide essential supplies, financial aid, and a listening ear to those in need. Join us in building a compassionate world where everyone has the opportunity to thrive and feel supported.";
  const words = text.split(' ').map((word, index) => <span key={index}>{word}&nbsp;</span>);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
      <div className="relative min-h-screen flex flex-col justify-center items-center text-white p-8 md:p-16 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="space-y-6 max-w-3xl">
          <p className="md:text-4xl text-2xl font-semibold">Join Us</p>
          <h1 className="md:text-7xl text-4xl font-bold leading-tight">
            Kind Heart Charity Service
          </h1>
          <div className="md:w-full">
            <p className="text-lg md:text-xl animate-words">
              {words}
             
            </p>
           
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        .animate-slide-in {
          animation: slide-in 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-words span {
          opacity: 0;
          display: inline-block;
          animation: fade-in-up 0.2s forwards;
        }
      `}</style>
    </div>
  );
}

export default Hero;
