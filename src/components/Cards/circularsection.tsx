import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture"; // Adjust path if needed

// Define the props this component will accept
interface CircularCategoryCardProps {
  category: {
    id: number;
    name: string;
    slug: string;
    image?: {
      // The 'image' property might be optional
      src: string;
    };
  };
}

const CircularCategoryCard: React.FC<CircularCategoryCardProps> = ({
  category,
}) => {
  // Use a fallback image if the category doesn't have one.
  // The image in the UI is a smartphone, so we'll use a similar placeholder.
  const imageUrl = category.image?.src || "/ccp-limited/smartWatch.png";

  return (
    <Link
      href={`/product-category/${category.slug}`}
      className="block w-24 flex-shrink-0 text-center group mx-auto">
      {/* The circular image container */}
      <div className="h-24 w-24 mx-auto rounded-full gap-5 border-2 border-gray-200 p-1 transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-md">
        <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
          <Picture
            src={imageUrl}
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* The category name text below */}
      <p className="mt-3 truncate text-sm font-medium text-gray-700 transition-colors duration-300 group-hover:text-cyan-600">
        {category.name}
      </p>
    </Link>
  );
};

export default CircularCategoryCard;
