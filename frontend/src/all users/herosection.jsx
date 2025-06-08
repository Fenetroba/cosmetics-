import React, { useEffect, useState, useCallback } from 'react'
import product1 from "../assets/product2.jpg"
import product2 from "../assets/product3.jpg"
import product3 from "../assets/product4.jpg"
import product4 from "../assets/product5.jpg"
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from '@/Components/ui/button'

const carouselItems = [
  {
    id: 1,
    image: product1,
    title: "Lorem assumenda architecto quis porro ",
    subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius cum quasi ",
    class:"rounded-t-full"
  },
  {
    id: 2,
    image: product2,
    title: "Luxury Vehicles for ",
    subtitle: "quaerat perspiciatis tempora minima doloremque, ",
    class:"rounded-tl-full "
  },
  {
    id: 3,
    image: product3,
    title: "Lorem ipsum dolor,",
    subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
    class:"rounded-t-full",
  },
  {
    id: 4,
    image: product4,
    title: "Lorem ipsum dolor, sit amet. ",
    subtitle: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  },
];

const Herosection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const nextSlide = useCallback(() => {
    if (isMounted) {
      setCurrentSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }
  }, [isMounted]);

  const prevSlide = useCallback(() => {
    if (isMounted) {
      setCurrentSlide((prev) =>
        prev === 0 ? carouselItems.length - 1 : prev - 1
      );
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isMounted, nextSlide]);

  if (!isMounted) return null;

  return (
    <section className='bg-[var(--two)] w-full flex md:flex-row flex-col items-center justify-between'>
      <div className='w-full h-[90vh]'>
        <div className="relative h-[500px] overflow-hidden rounded-lg sm:h-[550px]">
          <AnimatePresence mode="wait">
            {carouselItems.map((item, index) => (
              index === currentSlide && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full">
                    <img 
                      src={item.image} 
                      alt={`Slide ${index + 1}`} 
                      className={`cover p-4 text-center w-full shadow-white shadow-sm ${item.class}`} 
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <p className="mb-2 text-sm sm:text-base">{item.subtitle}</p>
                    <h2 className="mb-8 max-w-3xl text-3xl font-medium sm:text-4xl md:text-5xl">
                      {item.title}
                    </h2>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='text-right mr-30 p-5'>
        <h2 className='font-bold sm:text-4xl text-[var(--five)] mb-4'>NEW ARRIVAL</h2>
        <p className='text-[var(--six)] text-2xl mb-2'>Selam Delicate Skin & Hair Package</p>
        <p className='text-red-50 mb-10'>Lorem ipsum dolor sit amet consectetur adipisicing sit amet consectetur adipisicing </p>
        <Button>SHOP NOW</Button>
      </div>
    </section>
  );
};

export default Herosection;