import React, { useEffect, useState } from 'react'
import product1 from '../../assets/some.jpg'
import product2 from '../../assets/products (7).jpg'
import product3 from '../../assets/products (6).webp'
import product4 from '../../assets/product3.jpg'
import { ChevronLeft, ChevronRight } from 'lucide-react';
const carouselItems = [
  {
    id: 1,
    image: product1,
    title: "Drive Your Dreams Forward",
    subtitle: "Ethiopia's Premier Vehicle Import & Sales Company",
  },
  {
    id: 2,
    image: product2,
    title: "Luxury Vehicles for ",
    subtitle: "Premium Selection of Imported Cars",
  },
  {
    id: 3,
    image: product3,
    title: "Experience Excellence",
    subtitle: "Quality Service and Exceptional Value",
  },
  {
    id: 4,
    image: product4,
    title: "Experience Excellence ",
    subtitle: "Quality Service and Exceptional Value",
  },
]
const Herosection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      
  <div className="relative h-[500px] overflow-hidden rounded-lg sm:h-[550px] mt-1.5">
          {/* Carousel slides */}
          <div className="relative h-full">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Background image */}
                <div className="relative h-full w-full">
                
                    <img src={item.image} alt={`Slide ${index + 1}`}    className='cover p-4 text-center w-full ' />
                  
                 
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <p className="mb-2 text-sm sm:text-base">{item.subtitle}</p>
                  <h2 className="mb-8 max-w-3xl text-3xl font-medium sm:text-4xl md:text-5xl">
                    {item.title}
                  </h2>

                
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
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

          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Herosection