import Footer from '@/all users/Footer'
import Header from '@/all users/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import loginImage from '../../assets/rightside.webp'

const AuthLayer = () => {
  return (
    <div>
      <Header/>
      <div className='flex w-full'>
        <div className='flex-1 shadow-[-30px 10px 20px 40px] '><Outlet /></div>
        <div className='bg-white sm:w-[30%] max-sm:w-0 relative'>
          <div className='absolute left-0 top-0 w-19 h-full bg-gradient-to-r from-black/100 to-transparent'></div>
          <img src={loginImage} className='h-full max-sm:w-0' alt="loginImage" />
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default AuthLayer