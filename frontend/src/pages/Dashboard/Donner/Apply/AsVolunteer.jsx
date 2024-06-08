import React, { useState } from 'react';
import { useUser } from '../../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUser, FaEnvelope, FaAlignLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const API_URL = 'http://localhost:3000/application';

const AsVolunteer = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);
    newData.applierName = currentUser.name;
    newData.applierEmail = currentUser.email;
    newData.submitted = new Date();

    setIsSubmitting(true);

    toast.promise(
      axiosSecure.post(API_URL, newData)
        .then((res) => {
          console.log(res.data);
          return 'Submitted successfully!';
        })
        .catch((err) => {
          console.error(err);
          throw new Error('Failed to submit your application');
        })
        .finally(() => {
          setIsSubmitting(false);
        }),
      {
        pending: 'Submitting your application...',
        success: 'Submitted successfully!',
        error: 'Failed to submit your application',
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        className="max-w-lg mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-center text-4xl font-bold mb-8">Apply Volunteer</h1>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="volunteerName">
                  <FaUser className="inline mr-2 text-secondary" /> Your Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={currentUser?.name}
                  readOnly
                  disabled
                  name="volunteerName"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="volunteerEmail">
                  <FaEnvelope className="inline mr-2 text-secondary" /> Your Email
                </label>
                <input
                  className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={currentUser?.email}
                  readOnly
                  disabled
                  name="volunteerEmail"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                <FaAlignLeft className="inline mr-2 text-secondary" />Send Your Message
              </label>
              <textarea
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Send your message"
                name="message"
                rows="4"
              ></textarea>
            </div>
            <div className="text-center">
              <motion.button
                className="bg-secondary hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded w-full"
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Your Message...' : 'Send Your Message'}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AsVolunteer;
