import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Contact Us</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We're here to help and answer any question you might have. We look forward to hearing from you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Our Location</h3>
              <p className="text-gray-600">123 Charity Lane, Kind City, KH 12345</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Email Us</h3>
              <p className="text-gray-600">contact@kindheartcharity.org</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Call Us</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaWhatsapp className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">WhatsApp</h3>
              <p className="text-gray-600">+123 456 7890</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaClock className="text-2xl text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold">Working Hours</h3>
              <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sun: Closed</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15839.27249446069!2d79.92165714394066!3d7.0306523875379705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9cdbed9d9b1%3A0xedfad658ec11530!2sRagama!5e0!3m2!1sen!2slk!4v1717584081224!5m2!1sen!2slk"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
