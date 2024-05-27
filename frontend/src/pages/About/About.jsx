import React from 'react';
import image from '../../assets/about/image002.jpeg';
import image10 from '../../assets/about/image10.webp';
import image11 from '../../assets/about/image11.webp';
import image13 from '../../assets/about/image13.webp';

const VisionMissionHistory = () => {
  return (
    <div className="bg-gradient-to-b from-pink-200 to-pink-300 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-pink-800 hover:text-gray-600 transition-colors duration-300">Vision, Mission & History</h2>
      <p className="text-lg text-pink-800">
        We envision a world where young children have access to the resources and support they need. By fostering a culture of giving and empathy,
        we strive to create positive change and build stronger, more resilient communities. Founded in 2020, Kind Heart Charity has been dedicated to providing vital support and aid to needy children around the world through various projects aimed at improving healthcare, education, and socio-economic conditions.
      </p>
    </div>
  );
};

const Mission = () => {
  return (
    <div className="mb-8 bg-gradient-to-b from-blue-200 to-blue-300 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2 text-blue-800 hover:text-gray-600 transition-colors duration-300">Our Mission</h2>
      <p className="text-lg text-blue-800">
        We envision a world where young children have access to the resources and support they need. By fostering a culture of 
        giving and empathy, we strive to create positive change and build stronger, more resilient communities.
      </p>
    </div>
  );
};

const Team = () => {
  return (
    <div className="mb-8 bg-gradient-to-b from-green-200 to-green-300 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2 text-green-800 hover:text-gray-600 transition-colors duration-300">Our Team</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img src={image} alt="Kind Heart Team 1" className="w-full rounded-lg mb-2" />
            <p className="text-center font-medium text-gray-800">Kind Heart Team 1</p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img src={image10} alt="Kind Heart Team 2" className="w-full rounded-lg mb-2" />
            <p className="text-center font-medium text-gray-800">Kind Heart Team 2</p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img src={image11} alt="Kind Heart Team 3" className="w-full rounded-lg mb-2" />
            <p className="text-center font-medium text-gray-800">Kind Heart Team 3</p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <img src={image13} alt="Kind Heart Team 4" className="w-full rounded-lg mb-2" />
            <p className="text-center font-medium text-gray-800">Kind Heart Team 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const History = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-2 text-yellow-800 hover:text-gray-600 transition-colors duration-300">Our History</h2>
      <p className="text-lg text-yellow-800">
        Kind Heart Charity was founded in 2020 with a mission to provide vital support and aid to needy children around 
        the world. Over the years, many projects have been organized aimed at improving healthcare, education, and socio-economic 
        conditions for those in need. From disaster relief efforts to sustainable development initiatives, Kind Hearts Charity's 
        service has been a beacon of hope for countless young children. Through the dedication of volunteers and the generosity of 
        donors, the organization embodies the spirit of compassion and solidarity and makes a meaningful impact.
      </p>
    </div>
  );
};

const About = () => {
  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 hover:text-gray-600 transition-colors duration-300 my-24">About Us</h1>
        <p className="text-lg mb-8 text-center text-gray-800">
          Welcome to our website! At Kind Heart Donation, we believe in the transformative power of compassion and generosity.
          Our mission is to make a meaningful difference in the lives of those in need by connecting donors with worthy causes 
          and facilitating acts of kindness that have a lasting impact.
        </p>
        <VisionMissionHistory />
        <Mission />
        <Team />
        <History />
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Find Us Here</h2>
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.776057289473!2d79.85245757475701!3d6.917355393082235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596b1c2ae5b1%3A0x872e9262f485d782!2sColombo%20City%20Centre%20Mall%20and%20Residences!5e0!3m2!1sen!2slk!4v1716797963133!5m2!1sen!2slk"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              className="border-0 rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
