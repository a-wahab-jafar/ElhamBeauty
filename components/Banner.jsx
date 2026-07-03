import React from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] dark:bg-slate-800 my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-56"
        src={assets.banner_1}
        alt="banner_1"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px] dark:text-white">
          احصلي على أفضل المنتجات للعناية ببشرتك
        </h2>
        <p className="max-w-[343px] font-medium text-gray-800/60 dark:text-gray-300">
          اكتشفي مجموعة واسعة من المنتجات المميزة للعناية بالبشرة، بما في ذلك كريمات الترطيب، والمستحضرات الطبيعية، والمزيد. احصلي على بشرة صحية ومشرقة مع منتجاتنا عالية الجودة.
        </p>
        <Link
          href="/all-products"
          className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded"
        >
          <span className="text-white">إشتري الآن</span>
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="" />
        </Link>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.banner_2}
        alt="banner_2"
      />
      <Image
        className="md:hidden"
        src={assets.banner_2}
        alt="banner_2"
      />
    </div>
  );
};

export default Banner;