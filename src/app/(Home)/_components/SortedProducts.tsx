"use client";
import { convertToSlug } from "@constants";
import { BsArrowRight } from "@node_modules/react-icons/bs";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const Loader = () => (
  <div className="flex gap-2 w-full items-center">
    {/* Add more loader divs if you want more placeholders */}
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
    <div className="min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md" />
  </div>
);

const SortedProducts = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const router = useRouter();
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});

  useEffect(() => {
    // Fetch products for each filtered category
    const fetchCategoryProducts = async () => {
      try {
        // Set loading to true when starting the fetch
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`
              );
              return { [category?.id]: response?.data }; // Return products mapped by category id
            }
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with products mapped by category
          const productsMap = productsResults.reduce(
            (acc, result) => ({ ...acc, ...result }),
            {}
          );
          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        // Set loading to false when fetching is done
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  const TotalCategoryProductsMap: any = categoryProductsMap?.length;

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCategoryProductsMap - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
  };

  const handleCategoryClick = (name: string, id: number) => {
    const categorySlugId = `${convertToSlug(name) + "-" + id}`;
    dispatch(updateCategorySlugId({ categorySlugId }));
    router.push(`/category/${convertToSlug(name) + "-" + id}`);
  };

  const [activeTab, setActiveTab] = useState(0);

  const filteredCategories = categories
    ?.filter((category: CategoryType) => category?.count > 0)
    ?.slice(0, 5);

  return (
    <div className="mb-8 lg:mb-16 space-y-5 sm:space-y-6 mt-8 lg:mt-4">
      <h3 className="text-xl sm:text-2xl md:text-3xl text-center font-light tracking-tight">
        A Marketplace like no other
      </h3>
      <div className="space-y-6">
        {/* Tab Headers */}
        <div className="relative w-full">
          {/* Scrollable tabs container */}
          <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar px-2 md:px-4 py-2 w-full">
            {/* Tabs with proper spacing */}
            <div className="inline-flex rounded-full bg-primary border border-gray-200 p-1 space-x-1 min-w-max">
              {filteredCategories?.map(
                (category: CategoryType, index: number) => (
                  <button
                    key={category?.id}
                    onClick={() => setActiveTab(index)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 font-medium text-xs md:text-sm whitespace-nowrap border-2 transition-all duration-200 rounded-full flex items-center ${
                      activeTab === index
                        ? "border-white bg-white text-primary shadow-sm"
                        : "border-transparent text-white hover:bg-white/20"
                    }`}
                    aria-current={activeTab === index ? "page" : undefined}>
                    <span
                      dangerouslySetInnerHTML={{ __html: category?.name }}
                      className="max-w-[80px] truncate md:max-w-none"
                    />
                    {category?.count > 0 && (
                      <span
                        className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                          activeTab === index
                            ? "bg-primary text-white"
                            : "bg-white/20 text-white"
                        }`}>
                        {category?.count}
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mobile scroll indicator (only shows when scrollable) */}
          <div className="md:hidden absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-primary to-transparent pointer-events-none" />
        </div>

        {/* Tab Content */}
        <div className="px-2 md:px-4">
          {filteredCategories?.map((category: CategoryType, index: number) => (
            <div
              key={category.id}
              className={`space-y-5 ${activeTab !== index ? "hidden" : ""}`}>
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    <span dangerouslySetInnerHTML={{ __html: category.name }} />
                  </h2>
                </div>
                <Link
                  href={`/category/${convertToSlug(category.name)}-${
                    category.id
                  }`}
                  onClick={() =>
                    handleCategoryClick(category.name, category.id)
                  }
                  className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-primaryColor-400 transition-colors group">
                  View all
                  <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="relative">
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {categoryProductsMap[category.id]?.map(
                      (product: ProductType) => (
                        <ProductCard2
                          key={product.id}
                          id={product.id}
                          image={product.images[0]?.src}
                          oldAmount={product.regular_price}
                          newAmount={product.price}
                          description={product.name}
                          //   className="hover:shadow-lg transition-shadow"
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortedProducts;
