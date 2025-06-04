import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayer = () => {
  return (
    <div className='sm:m-8 rounded-tr-[14%] shadow-2xl'>
     <Outlet/>
    </div>
  )
}

export default AdminLayer