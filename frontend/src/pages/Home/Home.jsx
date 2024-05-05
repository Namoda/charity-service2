import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallary from './Gallary/Gallary'
import PopulerClases from './PopulerDonations/PopulerDonations'
import PopularCoaches from './PopularVolunteers/PopularVolunteers'
import { useAuth } from '../../hooks/useAuth'

const Home = () => {
 // const {user} = useAuth();
 // console.log(user)
  //console.log(import.meta.env.VITE_APIKEY)
  return (
    <div>
      <HeroContainer/>
      <div className='max-w-screen-x1 mx-auto'>
      <Gallary/>
      <PopulerClases/> 
      <PopularCoaches/>
      </div>
    </div>
  )
}

export default Home