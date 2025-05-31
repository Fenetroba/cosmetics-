import React from 'react'

import BestSell from "./BestSell";
import Founder_favorite from "./Founder_favorite";
import Header from "./Header";
import Inform from "./Inform";
import MeetTofounder from "./MeetTofounder";
import Start_shopping from "./Start_shopping";
import UserSay from ".//UserSay";
import Herosection from "./herosection";
import Footer from "../Components/Users/Footer";

const AllComponent = () => {
  return (
    <div>
     <Header />
 <Herosection />
 <Inform />
 <BestSell />
 <Start_shopping />
 <MeetTofounder />
 <Founder_favorite />
 <UserSay />
 <Footer />
    </div>
  )
}

export default AllComponent