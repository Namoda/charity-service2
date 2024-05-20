import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
  const { _id, name, image, AmountCanbeDonations, price, totalEnrolled } = item;

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
      <img src={image} alt={name} className='w-full h-40 object-cover rounded-md mb-4'/>
      <div className='text-center'>
        <h2 className='text-xl font-semibold mb-2'>{name}</h2>
        <p className='text-gray-600 mb-2'>Amount Can be Donations: {AmountCanbeDonations}</p>
        <p className='text-gray-600 mb-2'>Price: {price}</p>
        <p className='text-gray-600 mb-2'>Total Donors: {totalEnrolled}</p>
        <Link to={`donations/${_id}`}>
          <button className='w-full py-2 bg-secondary text-white font-bold rounded-md mt-4'>Select</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
