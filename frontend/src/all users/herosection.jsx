import React from "react";
import product from "../assets/product1.jpg";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/Components/ui/button";
const Herosection = () => {
  const [isVisibleSection, setIsVisibleSection] = useState(false);
  const sectionAnimatedRef = useRef(false);

  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
        ease: [0.16, 0.77, 0.47, 0.97],
        damping: 25,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("welcome-section");

      if (section && !sectionAnimatedRef.current) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisibleSection(true);
          sectionAnimatedRef.current = true;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section className="bg-[var(--two)] h-[90vh] w-full flex items-center justify-between">
    
        <div className="bg-custom-teal text-white min-h-screen py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mt-16">
            {/* Main Content */}
            <motion.div
              className="flex flex-col lg:flex-row gap-16 xl:gap-24 justify-center items-center"
              variants={sectionVariants}
              initial="hidden"
              animate={isVisibleSection ? "visible" : "hidden"}
            >
              {/* Left side - Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isVisibleSection
                    ? {
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.4, duration: 1.5 },
                      }
                    : {}
                }
                className="lg:w-5/12"
              >
                
              </motion.div>

              {/* Right side - Text */}
              {/* <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={
                  isVisibleSection
                    ? {
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.6, duration: 1.6 },
                      }
                    : {}
                }
                className="lg:w-7/12 text-center lg:text-left"
              >
                
               
                <motion.p
                  className="text-gray-100 leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={
                    isVisibleSection
                      ? {
                          opacity: 1,
                          transition: { delay: 1.3, duration: 1.2 },
                        }
                      : {}
                  }
                >
                  We believe in quality, transparency, and long-term
                 
                </motion.p>
              </motion.div> */}
            </motion.div>
          </div>
        </div>
      
      <div className="text-right mr-30 p-5">
        <h2 className="font-bold sm:text-4xl text-[var(--five)] mb-4">
          NEW ARRIVAL
        </h2>
        <p className="text-[var(--six)] text-2xl mb-2">
          Selam Delicate Skin & Hair Package
        </p>
        <p className="text-red-50 mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing sit amet
          consectetur adipisicing{" "}
        </p>
        <Button>SHOP NOW</Button>
      </div>
    </section>
  );
};

export default Herosection;
