import { PackageOpen } from "lucide-react";
import React from "react";
import cosmetics from '../assets/cosmetics.png'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Inform = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="flex overflow-hidden flex-col sm:flex-row sm:items-center w-full justify-between sm:px-20 space-x-4 p-7 border-b-2 mb-1.5">
      <motion.div 
        className="capitalize sm:text-3xl text-center"
        initial={{ x: -100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        We use only natural ingredients for our products which is good
        for you and the environment too.
      </motion.div>
      <motion.div 
        className="flex space-x-8 mt-10"
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src={cosmetics} alt="cosmetics" className="rounded-tr-full"/>
      </motion.div>
    </section>
  );
};

export default Inform;
