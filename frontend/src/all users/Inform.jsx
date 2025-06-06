import { PackageOpen } from "lucide-react";
import React from "react";
import cosmetics from '../assets/cosmetics.png'
const Inform = () => {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center w-full justify-between sm:px-20 space-x-4 p-7 border-b-2 mb-1.5">
      <div className=" capitalize sm:text-3xl text-center">
        We use only natural ingredients for our  products which is a good
      for you the enviroment too.
      </div>
      <div className="flex space-x-8 mt-10">
       <img src={cosmetics} alt="cosmetics" className="rounded-tr-full"/>
      </div>
    </section>
  );
};

export default Inform;
