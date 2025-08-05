import { Button } from "@node_modules/@nextui-org/button/dist";
import { Card } from "@node_modules/@nextui-org/card/dist";
import Link from "@node_modules/next/link";
import Image from "next/image";

const recentProducts = [
  {
    id: 1,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
    isActive: true,
  },
  {
    id: 2,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
  },
  {
    id: 3,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
  },
  {
    id: 4,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
  },
  {
    id: 5,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
  },
  {
    id: 6,
    name: "Daily Essentials",
    discount: "UP to 50% OFF",
    image: "/ccp-limited/ccp-image5.png",
  },
];

export default function RecentlyPurchased() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[1256px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-2xl font-semibold">
            Recently <span className="text-blue-600">Purchased</span>
          </h2>
          <div className="w-32 h-1 bg-blue-600 mt-2"></div>
        </div>
        <Link href="/">
          <Button variant="light" className="text-blue-600">
            View All →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {recentProducts.map((product) => (
          <Card
            key={product.id}
            className={`overflow-hidden ${
              product.isActive ? "ring-2 ring-blue-500" : ""
            }`}>
            <div className="p-4">
              <div className="aspect-square mb-4 flex items-center justify-center bg-gray-50 rounded">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">{product.name}</p>
                <p className="text-sm font-semibold text-blue-600">
                  {product.discount}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
