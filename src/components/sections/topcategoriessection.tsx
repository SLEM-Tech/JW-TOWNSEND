"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce"; // Adjust path
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
  const { data: categories, isLoading: categoryWpIsLoading, isError } = useCategories("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // State to hold products by category (similar to AllCategorySection)
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: string | null;
  }>({});

  // Filter categories with products
  const categoriesWithProducts = categories?.filter(
    (cat: CategoryType) => cat.count > 0
  ) || [];

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        // Get first 8-10 categories for top categories section
        const filteredCategories = categoriesWithProducts.slice(0, 10);

        if (filteredCategories.length > 0) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              try {
                const response = await WooCommerce.get(
                  `products?category=${category?.id}&per_page=1`
                );

                // Check if there is at least one product in the category
                const firstProductImage =
                  response?.data.length > 0
                    ? response?.data[0]?.images[0]?.src
                    : null;

                return {
                  categoryId: category?.id,
                  firstProductImage: firstProductImage,
                };
              } catch (error) {
                console.error(`Error fetching products for category ${category.id}:`, error);
                return {
                  categoryId: category?.id,
                  firstProductImage: null,
                };
              }
            }
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {}
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categoriesWithProducts.length > 0) {
      fetchCategoryProducts();
    } else if (!categoryWpIsLoading) {
      setIsLoading(false);
    }
  }, [categories, categoriesWithProducts.length, categoryWpIsLoading]);

  if (categoryWpIsLoading || isLoading) {
    return (
      <section className="my-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-24 text-center">
              <div className="h-24 w-24 mx-auto rounded-full bg-gray-200 animate-pulse"></div>
              <div className="mt-3 h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError || !categories || categories.length === 0) return null;

  // Only show categories that have product images
  const categoriesWithImages = categoriesWithProducts.filter(
    (category: CategoryType) => categoryProductsMap[category.id]
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
          href="/category"
          className="flex items-center gap-1 text-sm font-medium text-cyan-600 transition hover:text-cyan-800">
          View All <FaChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Categories Scroller */}
      <div className="flex gap-6 overflow-x-auto pb-4 -mb-4">
        {categoriesWithImages.map((category: CategoryType) => (
          <CircularCategoryCard 
            key={category.id} 
            category={{
              ...category,
              // Override the category image with the first product image
              image: { src: categoryProductsMap[category.id] || category.image?.src || "/ccp-limited/smartWatch.png" }
            }} 
          />
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesSection;