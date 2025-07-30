import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import MiddleBanner from "./(Home)/_components/MiddleBanner";
import HeroSection from "@src/components/PageFragments/AllCategorySection";
import SmartphonesSection from "./(Home)/_components/smartPhone-Section";
import CategoriesSection from "./(Home)/_components/categorySection";
import BrandsSection from "./(Home)/_components/brandSection";
import RecentlyPurchased from "./(Home)/_components/recentlyPurchasedSection";

const { description, title } = SEODATA.home;
export const metadata: Metadata = {
  title: title,
  description: description,
  icons: SEODATA.defaultOGImage,
  openGraph: {
    images: [
      {
        url: SEODATA.defaultOGImage,
      },
    ],
  },
};

const page = () => {
  return (
    <AppLayout className="pt-20 lg:pt-0 overflow-hidden mx-auto lg:mt-0 pb-12">
      <div className=" relative">
        <HeroSection />
      </div>
      <SmartphonesSection />
      <div className="mt-4 sm:mt-10 max-w-[1256px] mx-auto">
        <CategoriesSection />
        {/* <SortedProducts /> */}
      </div>
      <BrandsSection />
      <div className="mt-4 sm:mt-10 max-w-[1256px] mx-auto">
        <RecentlyPurchased />
      </div>
    </AppLayout>
  );
};

export default page;
