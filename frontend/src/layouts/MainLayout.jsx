import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/headers/NavBar'
import Footer from '../components/Footer/Footer'
import { ToastContainer } from 'react-toastify'


const MainLayout = () => {
  return (
    <main className='dark:bg-black overflow-hidden'>
        <NavBar/>
        <Outlet/>
        <Footer/>
        <ToastContainer />
        </main>
  )

}

export default MainLayout