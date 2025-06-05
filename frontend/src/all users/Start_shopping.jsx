import React from "react";
import { useNavigate } from "react-router-dom";
import product3 from "../assets/product4.jpg";
import product4 from "../assets/product5.jpg";
import product5 from "../assets/product1.jpg";
import { Button } from "@/Components/ui/button";

const startShopItems = [
  {
    id: 1,
    img: product3,
    title: "HAIR TREATMENT",
    description: "Discover our premium hair care solutions for healthy, beautiful hair.",
    path: "/shop/hair"
  },
  {
    id: 2,
    img: product4,
    title: "SKIN TREATMENT",
    description: "Explore our range of skin care products for radiant, glowing skin.",
    path: "/shop/skin"
  },
  {
    id: 3,
    img: product5,
    title: "FACE TREATMENT",
    description: "Find the perfect face care products for your skin type.",
    path: "/shop/face"
  },
];

const StartShopping = () => {
  const navigate = useNavigate();

  const handleShopClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mb-10 mx-4 md:mx-2 pb-4 md:p-10 border-18 rounded-lg ">
      <h1 className="text-[var(--one)] font-extrabold text-3xl pb-7 uppercase ">
        Start Shopping
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-18">
        {startShopItems.map((item) => (
          <div 
            key={item.id} 
            className="relative group hover:shadow-xl hover:scale-105 duration-300 rounded-lg overflow-hidden"
          >
            <img 
              src={item.img} 
              alt={item.title} 
              className="h-[400px] w-full object-cover" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-4 left-4">
                <Button 
                  onClick={() => handleShopClick(item.path)}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Shop Now
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartShopping;
