import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUser, FaEnvelope, FaAlignLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000/application-manage'; // Define your API URL here

const ManageApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(API_URL)
      .then((res) => {
        setApplications(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load applications');
        setIsLoading(false);
      });
  }, [axiosSecure]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-center text-4xl font-bold mb-8">Manage Applications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((application) => (
          <div key={application._id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FaUser className="inline mr-2 text-secondary" /> Applicant Name
              </label>
              <p className="text-gray-800">{application.applierName}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FaEnvelope className="inline mr-2 text-secondary" /> Applicant Email
              </label>
              <p className="text-gray-800">{application.applierEmail}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                <FaAlignLeft className="inline mr-2 text-secondary" /> Message
              </label>
              <p className="text-gray-800">{application.message}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Submitted On
              </label>
              <p className="text-gray-800">{new Date(application.submitted).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageApplication;

