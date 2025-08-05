// This file contains fallback data to be used when the API
// doesn't return products, or for development purposes.

import {
  iPhone,
  samsungPhone,
  samsungPhone1,
  xiaomiPhone,
  xiaomiPhone1,
} from "@public/images";

// Define the ProductType to ensure our mock data matches the real data structure.
// You should adjust this to match the actual 'ProductType' from your project.
export interface ProductType {
  id: number;
  name: string;
  permalink: string;
  images: { src: string }[];
  regular_price: string;
  sale_price: string;
  price: string;
}

// Create and export the array of fallback products.
export const fallbackProducts: ProductType[] = [
  {
    id: 9001,
    name: "Galaxy S22 Ultra (Placeholder)",
    permalink: "#",
    images: [{ src: iPhone.src }], // Using the src property of iPhone for the placeholder image
    regular_price: "74999",
    sale_price: "32999",
    price: "32999",
  },
  {
    id: 9002,
    name: "Galaxy M13 (4GB | 64 GB )",
    permalink: "#",
    images: [{ src: samsungPhone.src }],
    regular_price: "14999",
    sale_price: "10499",
    price: "10499",
  },
  {
    id: 9003,
    name: "Galaxy M33 (4GB | 64 GB )",
    permalink: "#",
    images: [{ src: samsungPhone1.src }],
    regular_price: "24999",
    sale_price: "16999",
    price: "16999",
  },
  {
    id: 9004,
    name: "Galaxy M53 (4GB | 64 GB )",
    permalink: "#",
    images: [{ src: xiaomiPhone.src }],
    regular_price: "40999",
    sale_price: "31999",
    price: "31999",
  },
  {
    id: 9005,
    name: "Galaxy S22 Ultra (Green )",
    permalink: "#",
    images: [{ src: xiaomiPhone1.src }],
    regular_price: "85999",
    sale_price: "67999",
    price: "67999",
  },
];
