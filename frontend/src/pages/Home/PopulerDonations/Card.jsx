import React from 'react'
import {Link} from "react-router-dom";
const Card = ({item}) => {
   // console.log(item)
    const {_id, name ,image, AmountCanbeDonations, price, totalEnrolled } = item;
  return (
    <div className='shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4'><img src={image} alt="" />
    <div className="p-4">
    <h2 className='text-xl font-semibold mb-2 dark:text=white'>{name}</h2>
    <p className='text-gray-600 mb-2'>Amount Can be Donations:{AmountCanbeDonations}</p>
    <p className='text-gray-600 mb-2'>Price:{price}</p>
    <p className='text-gray-600 mb-2'>Total Donner{totalEnrolled}</p>
    <Link to={`donations/${_id}`}className='text-center mt-2'>
        <button className='px-2 w-full py-1 bg-secondary rounded-x1 text-white font-bold mt-2'>Select</button>
        </Link>
    </div>
    </div>
  )
}

export default Card