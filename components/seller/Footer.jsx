import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-4 md:px-10 py-3">
      <div className="flex items-center gap-3 md:gap-4">
        <Image
          className="hidden md:block h-7 w-auto object-contain flex-shrink-0"
          src={assets.logo}
          alt="logo"
        />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-2 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © greatstack.dev All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Image className="h-4 w-4 object-contain" src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Image className="h-4 w-4 object-contain" src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <Image className="h-4 w-4 object-contain" src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;