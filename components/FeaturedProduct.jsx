import React from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_clere_cream,
    
    alt: "Woman applying Clere cream for radiant skin",
  },
  {
    id: 2,
    image: assets.girl_with_levia_lotion,
    alt: "Woman holding Levia lotion for soft skin care",
  },
  {
    id: 3,
    image: assets.girl_with_paris_lotion,
    alt: "Woman using Paris lotion in a skincare routine",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">منتجات مميزة</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description, alt }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={alt}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              <Link
                href="all-products"
                className="inline-flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded"
              >
                إشتري الآن <Image className="h-3 w-3" src={assets.redirect_icon} alt="" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
