import { PackageOpen } from 'lucide-react'
import React from 'react'

const Inform = () => {
  return (
   <section className='flex items-center w-full justify-between px-20 space-x-14 p-7 border-b-2 mb-1.5'>

     <div className='text-[19px] font-bold capitalize'>We use only natural ingredients for our <br/> products which is a good <br/> for you the enviroment too.</div>
     <div className='flex space-x-8'>
          <PackageOpen className='text-9xl'/>
          <PackageOpen className='text-9xl'/>
          <PackageOpen className='text-9xl'/>
     </div>
   </section>
  )
}

export default Inform