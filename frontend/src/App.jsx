

import './App.css'
import Footer from './Components/Users/footer'
import BestSell from './all users/BestSell'
import Founder_favorite from './all users/Founder_favorite'
import Header from './all users/Header'
import Inform from './all users/Inform'
import MeetTofounder from './all users/MeetTofounder'
import Start_shopping from './all users/Start_shopping'
import UserSay from './all users/UserSay'
import Herosection from './all users/herosection'

function App() {


  return (
    <>
     <Header/>
     <Herosection/>
        <Inform/>
        <BestSell/>
        <Start_shopping/>
        <MeetTofounder/>
        <Founder_favorite/>
        <UserSay/>
        <Footer/>
    </>
  )
}

export default App
