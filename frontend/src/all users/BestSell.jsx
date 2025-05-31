import React, { useEffect, useRef, useState } from "react";
import product1 from "../assets/product2.jpg";
import product2 from "../assets/product3.jpg";
import product3 from "../assets/product4.jpg";
import product4 from "../assets/product5.jpg";
import product5 from "../assets/product1.jpg";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    src: product1,
    alt: "product1",
    className: "row-span-3",
    imageWidth: "h-[300px]",
    description: "Lorem ipsum, dolor sit amet consectetur  o"
  },
  {
    id: 2,
    src: product2,
    alt: "product2",
    className: "row-span-3",
    imageWidth: "h-[350px]",
    description: "Lorem ipsum, dolor sit amet consectetur"
  },
  {
    id: 3,
    src: product3,
    alt: "product3",
    className: "col-span-1 row-span-2 md:row-span-1",
    imageWidth: "h-[400px]",
    description: "Lorem ipsum, dolor sit amet consectetur"
  },
  {
    id: 4,
    src: product4,
    alt: "product4",
    className: "col-span-1 row-span-2 md:row-span-1",
    imageWidth: "h-[450px]",
    description: "Lorem ipsum, dolor sit amet consectetur"
  },
  {
    id: 5,
    src: product5,
    alt: "product5",
    className: "col-span-1 md:col-span-2 row-span-5 md:row-span-2",
    imageWidth: "h-[500px]",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium o"
  },
];

const BestSell = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing after visibility
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div ref={ref} className="mb-30">
      <h1 className="text-[var(--two)] font-extrabold text-3xl p-7">
        BEST SELL
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-5.5 overflow-hidden ">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className={`${product.className} relative hover:shadow-lg hover:scale-105 duration-300`}
            initial={{ opacity: 0, y: 20 }} // Initial state
            animate={isVisible ? { opacity: 1, y: 0 } : {}} // Animate when visible
            transition={{ duration: 0.5, delay: index * 0.1 }} // Animation timing
          >
            <img
              src={product.src}
              alt={product.alt}
              className={`w-full ${product.imageWidth} rounded-2xl`}
            />
            <motion.p
              className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-md translate-y-4 opacity-100 hover:translate-y-0 transition-all duration-300"
              initial={{ opacity: 20, y: 20 }} // Initial state for the description
              animate={{ opacity: 20, y: 20 }} // Keep it hidden initially
              whileHover={{ opacity: 1, y:10  }} // Show on hover
            >
              {product.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BestSell;