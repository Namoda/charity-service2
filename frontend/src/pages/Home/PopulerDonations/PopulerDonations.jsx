import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './Card';

const PopularDonations = () => {
  const axiosFetch = useAxiosFetch();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axiosFetch.get('/donations')
      .then((response) => setDonations(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='container mx-auto my-36 px-4'>
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-bold'>Our <span className='text-secondary'>Popular</span> Donations</h1>
        <p className='text-gray-500 my-4 animate-description'>
          To donate to Kind Hearts Charity, visit our website, choose a donation method,
          fill out the form, and subscribe securely. Every donation counts.
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {donations.slice(0, 4).map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-description {
          animation: fade-in 3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PopularDonations;
