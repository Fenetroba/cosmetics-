import Footer from '@all-users/Footer'
import Header from '@all-users/Header'
import Herosection from '@/Components/Users/Herosection'
import Recommend_producrt from '@/Components/Users/Recommend_producrt'
import Righit_filter from '@/Components/Users/Righit_filter'
import Services from '@/Components/Users/services'
import React from 'react'
import ProductUser from './ProductUser'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar'

const Home = ({isAuthenticated}) => {
  return (
    <div>
      <Header isAuthenticated={isAuthenticated}/>
      <Herosection/>
   


      

      <SidebarProvider>

        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6 flex justify-between">
          <ProductUser/>
          </div>
        </div>
      </SidebarProvider>
      <Recommend_producrt/>
      <Footer/>
    </div>
  )
}

export default Home