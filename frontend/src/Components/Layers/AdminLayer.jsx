import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayer = () => {
  return (
    <div>AdminLayer
     <Outlet/>
    </div>
  )
}

export default AdminLayer