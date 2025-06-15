import Footer from '@/all users/Footer'
import Header from '@/all users/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import loginImage from '../../assets/some.jpg'
const AuthLayer = () => {
  return (
    <div>
      <Header/>
     <div className='flex w-full'>
     <div className='flex-1 shadow-[-30px 10px 20px 40px] '><Outlet /></div>
     <div className='bg-white sm:w-[30%] w-[20%] '><img src={loginImage} className='h-full' alt="" /></div>
     </div>
      <Footer/>
    </div>
  )
}

export default AuthLayer