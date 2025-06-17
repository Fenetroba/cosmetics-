import React from 'react'
import product1 from "../assets/product2.jpg"
import product2 from "../assets/product3.jpg"
import product3 from "../assets/product4.jpg"
import product4 from "../assets/some.jpg"
import product5 from "../assets/some.jpg"
const products = [
     { id: 1, name: "Replumping conditioner", image: product1 },
     { id: 2, name: "Advanced night repair",  image: product2 },
     { id: 3, name: "Tropical rehab shampoo",  image: product3 },
     { id: 4, name: "Lorem ipsum anti-cellulite body oil", image: product4 },
     { id: 5, name: "Conditioner for dry or dehydrated hair",  image: product5 },
 ];
const Founder_favorite = () => {
  return (
    <div className='bg-[var(--three)] mx-2'>
            <h1 className="text-[var(--one)] font-extrabold text-2xl py-5 uppercase mt-20 m-10">
            Founders Top 5 Favorites
        </h1>
    <div className="flex flex-col items-center p-6 border-b-2 mb-5">
            
            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center">
                        <img src={product.image} alt={product.name} className="w-49 h-49 rounded-full hover:shadow-lg hover:scale-105 duration-500 shadow-amber-50" />
                        <p className="mt-2 text-center">{product.name}</p>
                      
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Founder_favorite