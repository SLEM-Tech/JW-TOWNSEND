"use client";
import React from "react";
import Link from "next/link";
import { useCategories } from "@src/components/lib/woocommerce"; // Adjust path
import { FaChevronRight } from "react-icons/fa";
import CircularCategoryCard from "../Cards/circularsection";

// Define the type for a category object, matching your API response
interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
  count: number;
}

const TopCategoriesSection = () => {
  const { data: categories, isLoading, isError } = useCategories("");

  if (isLoading)
    return <div className="py-10 text-center">Loading Top Categories...</div>;
  if (isError || !categories || categories.length === 0) return null;

  const categoriesWithProducts = categories.filter(
    (cat: CategoryType) => cat.count > 0
  );

  return (
    <section className="my-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-8">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-800">
          Shop From <span className="text-cyan-600">Top Categories</span>
          <div className="mt-1 h-1 w-24 bg-cyan-500 rounded"></div>
        </h2>
        <Link
          href="/categories" // Link to a page that shows all categories
          className="flex items-center gap-1 text-sm font-medium text-cyan-600 transition hover:text-cyan-800">
          View All <FaChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Categories Scroller */}
      <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
        {categoriesWithProducts.map((category: CategoryType) => (
          <CircularCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesSection;
