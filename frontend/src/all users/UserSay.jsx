import React from 'react'
import Cus1 from '../assets/LOGO.png'
const UserInfo=[
     {id:1,img:Cus1,name:"chaltu" ,description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eius quis ipsa laborum rem saepe '},
     {id:2,img:Cus1,name:"beti", description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eius quis ipsa laborum rem saepe '},
     {id:3,img:Cus1,name:"solana" ,description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eius quis ipsa laborum rem saepe '},
     {id:4,img:Cus1,name:"chaseniltu" ,description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa eius quis ipsa laborum rem saepe '},
]

const UserSay = () => {
  return (
    <div className='mb-30'>
     <h1 className="text-[var(--three)] font-extrabold text-2xl p-1 uppercase mt-20 m-10">
            What Clients Say
        </h1>
        <div className='flex sm:flex-row flex-col  space-x-2 space-y-3.5 m-10'>
          {
               UserInfo.map((info)=>(
                    <div key={info.id} className=' shadow-sm shadow-amber-700 hover:shadow-sm hover:scale-105 duration-300 md:w-100 py-16 px-5 '>
                         <img src={info.img} alt="client_image " className=' shadow-amber-950 w-12 mb-5 rounded-full shadow-sm h-12' />
                         <p>{info.description}</p>
                         <h2 className='mt-10 text-[20px] font-bold capitalize'>{info.name}</h2>
                    </div>
               ))
          }

        </div>
    </div>
  )
}

export default UserSay