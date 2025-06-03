import Footer from '@/all users/Footer'
import Header from '@/all users/Header'
import Herosection from '@/Components/Users/Herosection'
import Recommend_producrt from '@/Components/Users/Recommend_producrt'
import Righit_filter from '@/Components/Users/Righit_filter'
import Services from '@/Components/Users/services'
import React from 'react'

const Home = ({isAuthenticated}) => {
  return (
    <div>
      <Header isAuthenticated={isAuthenticated}/>
      <Herosection/>
      <Righit_filter/>
      <Recommend_producrt/>
      <Services/>
      <Footer/>
    </div>
  )
}

export default Home