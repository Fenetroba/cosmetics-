"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Sample carousel data - you would replace these with your actual images and content
const carouselItems = [
  {
    id: 1,
    image: "/pr-car.png?height=600&width=1200",
    title: "Drive Your Dreams Forward with Prime Cars",
    subtitle: "Ethiopia's Premier Vehicle Import & Sales Company",
  },
  {
    id: 2,
    image: "/car4.avif?height=600&width=1200",
    title: "Luxury Vehicles for Every Lifestyle",
    subtitle: "Premium Selection of Imported Cars",
  },
  {
    id: 3,
    image: "/car1.cms?height=600&width=1200",
    title: "Experience Excellence on the Road",
    subtitle: "Quality Service and Exceptional Value",
  },
  {
    id: 4,
    image: "/car2.webp?height=600&width=1200",
    title: "Experience Excellence on the Road",
    subtitle: "Quality Service and Exceptional Value",
  },
  {
    id: 5,
    image: "/car3.jpg?height=600&width=1200",
    title: "Experience Excellence on the Road",
    subtitle: "Quality Service and Exceptional Value",
  },
  {
    id: 6,
    image: "/pr-car.png?height=600&width=1200",
    title: "Experience Excellence on the Road",
    subtitle: "Quality Service and Exceptional Value",
  },
];

export default function HeroCarousel() {
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
    <div className="relative w-full bg-custom-teal py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative h-[500px] overflow-hidden rounded-lg sm:h-[600px]">
          {/* Carousel slides */}
          <div className="relative h-full w-full">
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
                  <Image
                    src={item.image || "/pr-car.png"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                  <p className="mb-2 text-sm sm:text-base">{item.subtitle}</p>
                  <h2 className="mb-8 max-w-3xl text-3xl font-medium sm:text-4xl md:text-5xl">
                    {item.title}
                  </h2>

                  {/* contact button */}
                  {/* <Link
                    href="/contact"
                    className="flex items-center gap-2 rounded-full border border-orange-500 px-6 py-2 text-orange-500 transition-colors hover:bg-orange-500 hover:text-white"
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link> */}
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
    </div>
  );
}
