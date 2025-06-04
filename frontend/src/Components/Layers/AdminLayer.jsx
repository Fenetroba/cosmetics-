import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayer = () => {
  return (
    <div className='m-8 shadow-2xl h-96'>
     <Outlet/>
    </div>
  )
}

export default AdminLayer