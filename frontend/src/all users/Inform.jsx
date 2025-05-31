import { PackageOpen } from "lucide-react";
import React from "react";

const Inform = () => {
  return (
    <section className="flex flex-col sm:flex-row sm:items-center w-full justify-between sm:px-20 space-x-4 p-7 border-b-2 mb-1.5">
      <div className="text-[19px] font-bold capitalize">
        We use only natural ingredients for our  products which is a good
      for you the enviroment too.
      </div>
      <div className="flex space-x-8 mt-10">
        <PackageOpen className="text-9xl" />
        <PackageOpen className="text-9xl" />
        <PackageOpen className="text-9xl" />
      </div>
    </section>
  );
};

export default Inform;
