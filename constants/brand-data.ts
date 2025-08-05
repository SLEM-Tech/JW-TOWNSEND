// This file defines the data for the "Top Brands" section.
// This makes it easy to add, remove, or change brands in one place.

export interface BrandInfo {
  name: string;
  slug: string; // This will be used for the link URL
  logo: string; // URL to the brand logo
  productImage: string; // URL to the hero product image
  promoText: string;
  bgColor: string; // Tailwind CSS class for the background color
  textColor: string; // Tailwind CSS class for the text color
}

export const topBrands: BrandInfo[] = [
  {
    name: "iPhone",
    slug: "apple", // The brand slug for the URL
    logo: "/images/logo-tiny.svg", // You'll need to add these logo files to your /public/logos folder
    productImage: "/ccp-limited/iphone.png", // Add product images to /public/products
    promoText: "UP to 80% OFF",
    bgColor: "bg-gray-800",
    textColor: "text-white",
  },
  {
    name: "Realme",
    slug: "realme",
    logo: "/images/logo-tiny.svg",
    productImage: "/ccp-limited/narzo_phone.png",
    promoText: "UP to 80% OFF",
    bgColor: "bg-yellow-100",
    textColor: "text-gray-800",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "/images/logo-tiny.svg",
    productImage: "/ccp-limited/xiaomi_front.png",
    promoText: "UP to 80% OFF",
    bgColor: "bg-orange-100",
    textColor: "text-gray-800",
  },
  // Add more brands here as needed
];
