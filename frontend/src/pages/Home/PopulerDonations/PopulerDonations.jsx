import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import Card from './Card';

const PopulerClases = () => {
  const axiosFetch = useAxiosFetch();
  const [donations,setDonations] = useState([]);
  useEffect(() => {
    const fetchDonations = async() => {
        const response = await axiosFetch.get('/donations');
       //console.log(response.data)
        setDonations(response.data)
    }

    fetchDonations();
  }, [])
 // console.log(donations)
  return (
    <div className='md:w-[80%] mx-auto my-36'>
        <div>
            <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Popular</span> Donation</h1>
            
        <div className='w-[40%] text-center mx-auto my-4'>
            <p>
To donate to Kind Hearts Charity, visit our website, choose a donation method,
 fill out the form and subscribe securely. Not every donation counts.</p>
        </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          donations.slice(0,4).map((item, index) => <Card key={index} item={item}/>)
        }
        </div>
        </div>
    
  )
}

export default PopulerClases