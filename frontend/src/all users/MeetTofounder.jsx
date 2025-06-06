import React from "react";
import founderImage from '../assets/shampoo-4213395_640.jpg'
const MeetTofounder = () => {
  return (
    <div className="flex sm:flex-row flex-col justify-center items-center md:mx-40 my-20 m-3">
      <div className="bg-[var(--one)] p-20">
        <h1 className="text-[var(--three)] font-extrabold text-2xl p-1 uppercase">
          Meet The Founder Selame
        </h1>
        <p className="text-[var(--six)]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit sint
          modi accusamus excepturi consequuntur? Quia autem facere esse amet
          nisi veniam maxime in, doloribus modi, consequuntur nobis impedit
          repellat aspernatur.
        </p>
      </div>
      <div>
          <img src={founderImage} alt="founderImage"  className="rounded-r-3xl"/>
      </div>
    </div>
  );
};

export default MeetTofounder;
