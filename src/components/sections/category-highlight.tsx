"use client";
import React from "react";
import Link from "next/link";
import { useCategories } from "@src/components/lib/woocommerce";
import CategoryCard from "../Cards/CategoryCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
  count: number;
}

const CategoryHighlightSection = () => {
  const { data: categories, isLoading, isError } = useCategories("");

  if (isLoading)
    return <div className="py-10 text-center">Loading Categories...</div>;

  if (isError || !categories || categories.length === 0) return null;

  const categoriesWithProducts = categories.filter(
    (cat: CategoryType) => cat.count > 0
  );

  return (
    <section className="my-12 w-full max-w-7xl mx-auto px-4 sm:px-3 lg:px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Recently <span className="text-cyan-600">Purchased</span>
          <div className="mt-1 h-1 w-24 bg-cyan-500 rounded"></div>
        </h2>
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm font-medium text-cyan-600 transition hover:text-cyan-800">
          View All <FaChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="relative">
        {/* Left Chevron */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <div className="swiper-button-prev-custom bg-white border rounded-full p-2 shadow hover:bg-cyan-50 transition">
            <FaChevronLeft className="text-cyan-600 w-4 h-4" />
          </div>
        </div>

        {/* Right Chevron */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <div className="swiper-button-next-custom bg-white border rounded-full p-2 shadow hover:bg-cyan-50 transition">
            <FaChevronRight className="text-cyan-600 w-4 h-4" />
          </div>
        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={1.3}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="py-2">
          {categoriesWithProducts.map(
            (category: CategoryType, index: number) => (
              <SwiperSlide key={category.id}>
                <CategoryCard
                  category={category}
                  promoText="UP to 50% OFF"
                  isHighlighted={index === 0}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryHighlightSection;
