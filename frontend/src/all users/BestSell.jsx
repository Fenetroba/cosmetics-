import React, { useEffect, useRef, useState } from "react";
import product1 from "../assets/product2.jpg";
import { motion } from "framer-motion";

const product = {
  id: 1,
  src: product1,
  alt: "Premium Hair Care",
  description: "Revitalize your hair with our premium care collection",
  category: "Hair Care"
};

const BestSell = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    
    if (ref.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect observer after first intersection
            if (observer) {
              observer.disconnect();
            }
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array to run only once

  return (
    <motion.div 
      ref={ref} 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-[var(--two)] font-extrabold text-4xl md:text-5xl mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Best Sellers
        </motion.h1>
        <motion.p 
          className="text-gray-600 mb-12 max-w-2xl"
          initial={{ y: -20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover our most loved products, carefully selected for their quality and effectiveness
        </motion.p>
        
        <motion.div
          className="group relative w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-2xl h-[300px]">
            <motion.img
              src={product.src}
              alt={product.alt}
              className="w-full h-full object-cover transition-transform duration-700"
              whileHover={{ scale: 1.1 }}
            />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-green-700/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.span
                  className="text-white/80 text-sm font-medium tracking-wider uppercase"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {product.category}
                </motion.span>
                <motion.p
                  className="text-white text-xl font-medium mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {product.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BestSell;