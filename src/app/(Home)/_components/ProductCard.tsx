import React from "react";
import Link from "next/link";
import Picture from "@src/components/picture/Picture"; // Assuming this path is correct

// Define the types for the props the card will receive
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    permalink: string;
    images: { src: string }[];
    regular_price: string;
    sale_price: string;
    price: string;
  };
  isHighlighted?: boolean; // To handle the blue border on the highlighted card
}

// Helper function to calculate savings
const calculateSavings = (regular: string, sale: string) => {
  const regularPrice = parseFloat(regular);
  const salePrice = parseFloat(sale);
  if (!isNaN(regularPrice) && !isNaN(salePrice)) {
    return regularPrice - salePrice;
  }
  return 0;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHighlighted = false,
}) => {
  const savings = calculateSavings(product.regular_price, product.sale_price);
  const discountPercentage = Math.round(
    (savings / parseFloat(product.regular_price)) * 100
  );

  return (
    <Link href={product.permalink} className="block w-64 flex-shrink-0">
      <div
        className={`relative rounded-lg border bg-white p-4 transition-shadow duration-300 hover:shadow-lg ${
          isHighlighted
            ? "border-2 border-cyan-500 shadow-xl"
            : "border-gray-200"
        }`}>
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-0 right-0 z-10 -mt-2 -mr-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-tr-lg rounded-bl-lg bg-cyan-500 text-center text-xs font-bold text-white">
              {discountPercentage}% OFF
            </div>
          </div>
        )}

        {/* Product Image */}
        <div className="flex h-48 items-center justify-center">
          <Picture
            src={product.images[0]?.src || "/ccp-limited/samsung_phone.png"}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="mt-4 border-t border-gray-100 pt-4 text-left">
          <p className="truncate text-sm font-medium text-gray-800">
            {product.name}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.sale_price && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.regular_price}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="mt-1 text-sm font-semibold text-green-600">
              Save - ₹{savings.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
