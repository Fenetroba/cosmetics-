import React from 'react'
import product1 from "../assets/product2.jpg"
import product2 from "../assets/product3.jpg"
import product3 from "../assets/product4.jpg"
import product4 from "../assets/product5.jpg"
import product5 from "../assets/product1.jpg"

const BestSell = () => {
  return (
    <div>
     <h1 className='text-[var(--two)] font-extrabold text-3xl p-7'>BEST SELL</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-2.5">
    <div className="row-span-3">
        <img src={product1} alt="product1" className="w-full h-auto md:h-75" />
    </div>
    <div className="row-span-3">
        <img src={product2} alt="product2" className="w-full h-auto md:h-85" />
    </div>
    <div className="col-span-1 row-span-2 md:row-span-1">
        <img src={product3} alt="product3" className="w-full md:h-95 h-auto" />
    </div>
    <div className="col-span-1 row-span-2 md:row-span-1">
        <img src={product4} alt="product4" className="w-full h-auto md:h-105" />
    </div>
    <div className="col-span-1 md:col-span-2 row-span-5 md:row-span-2">
        <img src={product5} alt="product5" className="w-full h-auto md:w-115" />
    </div>
</div>
    
    </div>
  )
}

export default BestSell