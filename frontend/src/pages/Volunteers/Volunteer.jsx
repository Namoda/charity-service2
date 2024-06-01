import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import img1 from '../../assets/voleeter.jpg';

const WebPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left side with the image */}
      <motion.div
        className="w-1/2"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={img1}
          alt="Volunteer"
          className="object-cover h-full w-full"
        />
      </motion.div>

      {/* Right side with paragraph and button */}
      <motion.div
        className="w-1/2 flex flex-col justify-center items-center bg-light-pink p-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-10 rounded-lg shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-center font-serif leading-relaxed">
            Join our dedicated team at CharityWorks and make a real difference in the community. We offer a variety of volunteer opportunities to suit 
            your skills and interests. Whether you're passionate about helping the homeless, mentoring youth,
            or supporting environmental initiatives, we have a place for you. Click the button below to start your volunteer journey with us today!
          </p>
          <div className="text-center">
            <Link to="/apply-volunteer">
              <motion.button
                className="px-4 py-2 mt-4 text-white bg-secondary rounded hover:bg-red-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WebPage;
