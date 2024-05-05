import React from 'react';
import image from '../../assets/about/image002.jpeg'
import image1 from '../../assets/about/image003.jpeg'
const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-lg mb-4">Welcome to our website! We're dedicated to...
      At Kind Heart Donation, we believe in the transformative power of compassion and generosity.
       Our mission is to make a meaningful difference in the lives of those in need by connecting donors
        with worthy causes and facilitating acts of kindness that have a lasting impact.</p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-lg">We envision a world where young children have access to the resources and 
        support they need. By fostering a culture of giving and empathy, we strive to create positive change 
        and build stronger, more resilient communities.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <img src={image} alt="John Doe" className="w-full rounded-lg" />
            <p className="mt-2">Kind Heart Team 1</p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <img src={image1} alt="Jane Smith" className="w-full rounded-lg" />
            <p className="mt-2">Kind heart Team 2</p>
          </div>
          {/* Add more team members here */}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Our History</h2>
        <p className="text-lg">Kind Heart Charity was founded in 2020 with a mission to provide
         vital support and aid to needy children around the world. Over the years, many projects 
         have been organized aimed at improving healthcare, education and socio-economic conditions 
         for those in need. From disaster relief efforts to sustainable development initiatives, 
         Kind Hearts Charity's service has been a beacon of hope for countless young children.
          Through the dedication of volunteers and the generosity of donors, the organization 
          embodies the spirit of compassion and solidarity and makes a meaningful impact.</p>
      </div>
    </div>
  );
};

export default About;

