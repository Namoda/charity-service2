import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo or Brand Name */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-bold hover:text-gray-400 transition-colors duration-300">Kind Heart Charity</Link>
            <p className="text-gray-400 mt-2">
              Dedicated to spreading kindness through acts of generosity and support. Join us in building a compassionate world.
            </p>
          </div>
          
          {/* Contact Details */}
          <div className="text-gray-400">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="flex items-center mb-2">
              <FaEnvelope className="mr-2" />
              <p>Email: info@kindheartcharity.org</p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="mr-2" />
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <p>Location: 123 Charity St, Kind City, KH 12345</p>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Kind Heart Charity. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
