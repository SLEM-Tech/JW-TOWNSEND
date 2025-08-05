import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture"; // Adjust path if needed
import { samsungPhone } from "@public/images";

// Define the props this component will accept
interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    slug: string;
    image?: {
      // The 'image' property might be optional
      src: string;
    };
  };
  promoText: string; // e.g., "UP to 50% OFF"
  isHighlighted?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  promoText,
  isHighlighted = false,
}) => {
  // Use a fallback image if the category doesn't have one
  const imageUrl = category.image?.src || "/ccp-limited/samsung_phone.png"; // A generic placeholder

  return (
    <Link
      href={`/product-category/${category.slug}`}
      className="block w-48 flex-shrink-0">
      <div
        className={`group rounded-lg border bg-white p-3 transition-all duration-300 hover:shadow-md ${
          isHighlighted
            ? "border-2 border-cyan-500 shadow-lg"
            : "border-gray-200"
        }`}>
        {/* Category Image */}
        <div className="h-36 w-full overflow-hidden rounded-md bg-gray-50 flex items-center justify-center">
          <Picture
            src={imageUrl}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Category Info */}
        <div className="mt-3 text-center">
          <p className="truncate text-sm font-medium text-gray-700">
            {category.name}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-gray-800">
            {promoText}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
