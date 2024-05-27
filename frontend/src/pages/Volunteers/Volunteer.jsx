import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/voleeter.jpg'
const WebPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left side with the image */}
      <div className="w-1/2">
        <img
          src={img1}
          alt="Placeholder"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Right side with paragraph and button */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-[#FFB1B1] p-8">
        <p className="text-2xl mb-6 text-center font-poppins animate-fade-in animate-bold">
          Join our dedicated team at CharityWorks and make a real difference in the community. We offer a variety of volunteer opportunities to suit your skills and interests. Whether you're passionate about helping the homeless, mentoring youth, or supporting environmental initiatives, we have a place for you. Click the button below to start your volunteer journey with us today!
        </p>
        <Link to="/apply-volunteer">
          <button className="px-4 py-2 mt-4 w-full text-white bg-secondary rounded hover:bg-red-400">
            Join Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WebPage;
