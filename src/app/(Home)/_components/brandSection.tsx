"use client";
import { Button } from "@nextui-org/button";
import Link from "@node_modules/next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const brands = [
  {
    id: 1,
    name: "IPHONE",
    discount: "UP to 80% OFF",
    bgColor: "bg-gray-800",
    textColor: "text-white",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 2,
    name: "REALME",
    discount: "UP to 80% OFF",
    bgColor: "bg-yellow-100",
    textColor: "text-black",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 3,
    name: "XIAOMI",
    discount: "UP to 80% OFF",
    bgColor: "bg-orange-100",
    textColor: "text-black",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 4,
    name: "SAMSUNG",
    discount: "UP to 70% OFF",
    bgColor: "bg-blue-100",
    textColor: "text-black",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 5,
    name: "HUAWEI",
    discount: "UP to 65% OFF",
    bgColor: "bg-green-100",
    textColor: "text-black",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 6,
    name: "OPPO",
    discount: "UP to 75% OFF",
    bgColor: "bg-purple-100",
    textColor: "text-black",
    logo: "/images/logo-tiny.svg",
    image: "/ccp-limited/ccp-image2.png",
  },
];

export default function BrandsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const itemsToShow = { base: 1, md: 3 }; // 1 card on mobile, 3 on md (768px) and above
  const totalItems = brands.length;
  const slideWidth = 100 / itemsToShow.md; // Base width for 3 cards on desktop

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const translateX = -currentIndex * (100 / itemsToShow.md);
      carouselRef.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-[1256px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Top <span className="text-blue-600">Electronics Brands</span>
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-blue-600 mt-1 sm:mt-2"></div>
        </div>
        <Link href="/category">
          <Button
            variant="light"
            className="hover:bg-none text-blue-600 font-medium mt-2 sm:mt-0">
            View All →
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className="flex transition-transform space-x-2 duration-500 ease-in-out"
            style={{ width: `${(100 * totalItems) / itemsToShow.md}%` }}>
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={`relative flex items-center justify-between w-1/3 rounded-xl p-2  sm:p-4 shadow-md overflow-hidden ${brand.bgColor}`}>
                <div className="absolute right-0 top-0 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-slate-500/30 blur-2xl z-0" />

                {/* Left: Brand Details */}
                <div className="flex flex-col items-start space-y-2 sm:space-y-4 relative z-10">
                  <div
                    className={`px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm rounded-md ${brand.textColor} bg-black/20`}>
                    {brand.name}
                  </div>
                  <div className="bg-background p-1 sm:p-3 rounded-xl">
                    {brand.logo && (
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div
                    className={`text-base sm:text-lg font-semibold ${brand.textColor}`}>
                    {brand.discount}
                  </div>
                </div>

                {/* Right: Product Image */}
                <div className="ml-2 sm:ml-4 relative z-10">
                  <Image
                    src={brand.image}
                    alt={`${brand.name} phone`}
                    width={80}
                    height={120}
                    className="object-contain sm:width={100} sm:height={150}"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {brands.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
