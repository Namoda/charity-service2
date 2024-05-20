import React, { useState, useEffect } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import img from '../../../assets/home/girl.png';

const PopularVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const axiosFetch = useAxiosFetch();
  
  useEffect(() => {
    axiosFetch.get('/popular-volunteers')
      .then((data) => setVolunteers(data.data))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className='container mx-auto my-36 px-4'>
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-bold'>Our <span className='text-secondary'>Best</span> Volunteers</h1>
        <p className='text-gray-500 my-4 animate-text'>
          Volunteers are vital for Kind Heart Charity Service, extending reach, offering diverse skills,
          minimizing costs, fostering community connections, and bringing passion and dedication.
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {volunteers.slice(0, 4).map((volunteer, i) => (
          <div key={i} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
            <img className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-300' src={volunteer?.volunteer?.photoUrl || img} alt="Volunteer" />
            <div className='text-center'>
              <p className='font-medium text-lg text-gray-800 dark:text-white'>{volunteer?.volunteer?.name}</p>
              <p className='text-gray-500'>Volunteer</p>
              <p className='text-gray-500'>Total Donors: {volunteer?.totalEnrolled}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes text-fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes text-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-text {
          animation: text-fade-in 1s ease-out forwards, text-bounce 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default PopularVolunteers;
