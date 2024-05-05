import React from 'react'

import bgImg from '../../../assets/home/banner-1.jpg'


const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
    <div className='min-h-screen flex justify-start p1-11 items-center text-white bg-black bg-opacity-60'>
        <div>
          
           
            <div className='space-y-6 space-x-8'> 
            
              <p className='md:text-4xl text-2xl'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Join Us</p>
              <h1 className='md:text-7xl text-4xl font-bold space-x-9'>Charity Service and<br/>Donation</h1>
              <div className='md:w-1/2'>
                <p>Kind Heart Donation & Charity Service is dedicated to spreading kindness through acts of
          generosity and support. We provide essential supplies, financial aid, and a listening ear 
          to those in need. Join us in building a compassionate world where everyone has the opportunity
           to thrive and feel supported.</p>
              </div>
              <div className='flex flex-warp item-center gap-5'>
              </div>
          </div>
          </div>
        </div>
      </div> 
    
  )
}

export default Hero