import Header from '@all-users/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ShopLayer = () => {
  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  )
}

export default ShopLayer