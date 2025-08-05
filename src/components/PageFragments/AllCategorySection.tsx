"use client";
import { FaShoppingBag } from "@node_modules/react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "@node_modules/react-icons/fi";
import { smartWatchBanner } from "@public/images";
import { useEffect, useState } from "react";
import Picture from "../picture/Picture";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 25,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;

        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };

        clearInterval(timer);
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const carouselItems = [
    {
      id: 1,
      title: "Best Deal Online on smart watches",
      subtitle: "SMART WEARABLE.",
      discount: "UP to 80% OFF",
      image: smartWatchBanner,
    },
    {
      id: 2,
      title: "New Collection of Headphones",
      subtitle: "AUDIO ESSENTIALS.",
      discount: "UP to 50% OFF",
      image: smartWatchBanner,
    },
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden mt-0 md:mt-20 text-white">
      <div className="relative h-auto min-h-[300px] sm:h-[420px] md:h-[350px] rounded-xl bg-[#1C2340] overflow-hidden mx-2 sm:mx-4 md:mx-8 shadow-xl">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}>
            <div className="container mx-auto px-4 sm:px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8">
                {/* TEXT */}
                <div className="space-y-3">
                  <p className="text-white/70 text-md font-medium">
                    {item.title}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-extrabold uppercase">
                    {item.subtitle}
                  </h1>
                  <p className="text-lg sm:text-xl font-semibold">
                    {item.discount}
                  </p>

                  {/* COUNTDOWN */}
                  <div className="flex items-center gap-1 sm:gap-2 mt-4 sm:mt-6">
                    {[
                      ["Hours", timeLeft.hours],
                      ["Minutes", timeLeft.minutes],
                      ["Seconds", timeLeft.seconds],
                    ].map(([label, value], idx) => (
                      <div
                        key={label}
                        className="bg-black/30 rounded-lg p-1 sm:p-2 text-center min-w-[40px] sm:min-w-[50px]">
                        <span className="block text-lg sm:text-xl font-bold">
                          {String(value).padStart(2, "0")}
                        </span>
                        <span className="text-xs">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* BUTTON */}
                  <button className="mt-4 sm:mt-6 flex items-center gap-2 bg-white text-[#1C2340] px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-gray-100 transition">
                    <FaShoppingBag />
                    Shop Now
                  </button>
                </div>

                {/* IMAGE */}
                <div className=" relative hidden md:flex justify-center items-center">
                  <div className="absolute w-[430px] h-[430px] bg-[#1C2340] border border-white/10 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
                  <div className="absolute w-[380px] h-[380px] bg-[#2C3454] border border-white/10 rounded-full -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />
                  {/* <img
                    src={item.image}
                    alt={item.title}
                    className="relative z-10 h-[150px] sm:h-[200px] md:h-[260px] object-contain drop-shadow-2xl"
                  /> */}

                  <Picture
                    src={
                      typeof item.image === "string"
                        ? item.image
                        : item.image.src
                    }
                    alt="highest"
                    className="relative z-10 h-[150px] sm:h-[200px] md:h-[260px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute md:flex hidden left-[-13px] top-1/2 -translate-y-1/2 bg-white text-[#1C2340] p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          aria-label="Previous slide">
          <FiChevronLeft className="text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute md:flex hidden right-[-13px] top-1/2 -translate-y-1/2 bg-white text-[#1C2340] p-3 rounded-full shadow hover:bg-gray-100 transition z-10"
          aria-label="Next slide">
          <FiChevronRight className="text-xl" />
        </button>

        {/* DOT INDICATORS */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
