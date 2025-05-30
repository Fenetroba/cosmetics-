import React from "react";
import product3 from "../assets/product4.jpg";
import product4 from "../assets/product5.jpg";
import product5 from "../assets/product1.jpg";
import { Button } from "@/Components/ui/button";

const startShope = [
  {
    id: 1,
    img: product3,
    Title: "HAIR TRITMENT",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    img: product4,
    Title: "SKIN TRITMENT",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    img: product5,
    Title: "FACE TRITMENT",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];
const Start_shopping = () => {
  return (
    <div className="mt-10 m-10 border-4 p-10">
      <h1 className="text-[var(--two)] font-extrabold text-3xl p-7 uppercase">
        start to shopping
      </h1>

      <div className="flex space-x-20 justify-center ">
        {startShope.map((start) => (
          <div className="relative hover:shadow-lg hover:scale-105 duration-300" key={start.id}>
            <img src={start.img} alt="product3" className="h-[400px] w-full " />

            <Button className="absolute top-0">GET SHOP</Button>
            <p className="absolute top-[50%] p-10 text-[var(--six)] font-bold">{start.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Start_shopping;
