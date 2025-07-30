"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";

const smartphones = [
  {
    id: 1,
    name: "Galaxy S22 Ultra",
    originalPrice: "₹74999",
    currentPrice: "₹32999",
    discount: "56% OFF",
    savings: "₹32999",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 2,
    name: "Galaxy M13 (4GB | 64 GB)",
    originalPrice: "₹14999",
    currentPrice: "₹10499",
    discount: "56% OFF",
    savings: "₹4500",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 3,
    name: "Galaxy M33 (4GB | 64 GB)",
    originalPrice: "₹24999",
    currentPrice: "₹16999",
    discount: "56% OFF",
    savings: "₹8000",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 4,
    name: "Galaxy M53 (4GB | 64 GB)",
    originalPrice: "₹40999",
    currentPrice: "₹31999",
    discount: "56% OFF",
    savings: "₹9000",
    image: "/ccp-limited/ccp-image2.png",
  },
  {
    id: 5,
    name: "Galaxy S22 Ultra",
    originalPrice: "₹85999",
    currentPrice: "₹67999",
    discount: "56% OFF",
    savings: "₹18000",
    image: "/ccp-limited/ccp-image2.png",
  },
];

export default function SmartphonesSection() {
  const [activeCard, setActiveCard] = useState<number>(smartphones[0].id);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Heading and Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold">
            Grab the best deal on{" "}
            <span className="text-blue-600">Smartphones</span>
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-blue-600 mt-1 sm:mt-2"></div>
        </div>
        <Button
          variant="light"
          className="text-blue-600 font-medium mt-2 sm:mt-0">
          View All →
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
        {smartphones.map((phone) => (
          <Card
            key={phone.id}
            className={`relative cursor-pointer bg-white rounded-lg p-2 sm:p-3 transition-all duration-300 border 
              ${
                activeCard === phone.id
                  ? "border-blue-500 shadow-lg scale-[1.02] border-2"
                  : "border-gray-200 hover:shadow-md"
              }`}
            onClick={() => setActiveCard(phone.id)}>
            {/* Discount Badge */}
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white text-xs font-semibold px-1 sm:px-2 py-0.5 sm:py-1 rounded-l-md z-10">
              {phone.discount}
            </div>

            {/* Image */}
            <div className="aspect-[3/4] mb-2 sm:mb-4 flex items-center justify-center bg-gray-50 rounded">
              <Image
                src={phone.image}
                alt={phone.name}
                width={80}
                height={120}
                className="object-contain w-full h-full sm:width={120} sm:height={160}"
              />
            </div>

            {/* Phone Name */}
            <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">
              {phone.name}
            </h3>

            {/* Pricing */}
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm sm:text-lg font-bold">
                  {phone.currentPrice}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {phone.originalPrice}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-green-600 font-medium">
                Save : {phone.savings}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
