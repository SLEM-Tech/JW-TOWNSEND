"use client";
import React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronRight } from "react-icons/fa";
import { BrandInfo, topBrands } from "@constants/brand-data";

// --- Child Component: The Brand Card ---
// It's defined in the same file for easier access to carousel props if needed.
const BrandCard: React.FC<{ brand: BrandInfo }> = ({ brand }) => {
  return (
    // The 'embla__slide' className is important for the carousel to work
    <div className="embla__slide flex-[0_0_90%] sm:flex-[0_0_45%] md:flex-[0_0_32%] pl-4">
      <Link href={`/brand/${brand.slug}`} className="block w-full">
        <div
          className={`relative flex items-center justify-between h-48 rounded-2xl overflow-hidden p-6 ${brand.bgColor} ${brand.textColor}`}>
          {/* Left Side: Text and Logo */}
          <div className="z-10 flex flex-col justify-between h-full">
            <span className="text-xs font-semibold px-3 py-1 bg-black/20 rounded-full w-fit">
              {brand.name}
            </span>
            <div>
              <img
                src={brand.logo}
                alt={`${brand.name} Logo`}
                className="w-10 h-10"
              />
              <p className="mt-2 text-lg font-bold">{brand.promoText}</p>
            </div>
          </div>
          {/* Right Side: Product Image */}
          <div className="relative z-0 h-full w-1/2">
            <img
              src={brand.productImage}
              alt={`A ${brand.name} product`}
              className="absolute -right-10 -top-5 h-56 w-auto object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

// --- Parent Component: The Main Section ---
const TopBrandsSection = () => {
  // Initialize the Embla Carousel
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });

  return (
    <section className="my-16 w-full max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
          Top Electronics <span className="text-cyan-600">Brands</span>
          <div className="mt-1 h-1 w-24 bg-cyan-500 rounded"></div>
        </h2>
        <Link
          href="/brands" // Link to a page that shows all brands
          className="flex items-center gap-1 text-sm font-medium text-cyan-600 transition hover:text-cyan-800">
          View All <FaChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Embla Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {topBrands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </div>
      {/* Note: We can add the pagination dots here later if needed */}
    </section>
  );
};

export default TopBrandsSection;
