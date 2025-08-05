"use client";
import { Button } from "@nextui-org/button";
import Link from "@node_modules/next/link";
import Image from "next/image";
import { useState } from "react";

const categories = [
  { id: 1, name: "Mobile", icon: "/ccp-limited/ccp-image3.png" },
  { id: 2, name: "Laptops", icon: "/ccp-limited/ccp-image3.png" },
  { id: 3, name: "Electronics", icon: "/ccp-limited/ccp-image3.png" },
  { id: 4, name: "Console", icon: "/ccp-limited/ccp-image3.png" },
  { id: 5, name: "Peripherals", icon: "/ccp-limited/ccp-image3.png" },
  { id: 6, name: "Speakers", icon: "/ccp-limited/ccp-image3.png" },
  { id: 7, name: "Wearables", icon: "/ccp-limited/ccp-image3.png" },
];

export default function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState<number>(
    categories[0].id
  );

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-[1256px]">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg md:text-2xl font-semibold">
            Shop From <span className="text-blue-600">Top Categories</span>
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-blue-600 mt-1 sm:mt-2"></div>
        </div>
        <Link href="/category">
          <Button variant="light" className="text-blue-600 mt-2 sm:mt-0">
            View All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 justify-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveCategory(category.id)}>
            <div
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 ${
                activeCategory === category.id
                  ? "border-blue-600"
                  : "border-blue-300"
              } flex items-center justify-center mb-2 sm:mb-4 hover:border-blue-400 transition-colors`}>
              <Image
                src={category.icon || "/placeholder.svg"}
                alt={category.name}
                width={80}
                height={80}
                className="object-contain w-full h-full sm:width={100} sm:height={100}"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
