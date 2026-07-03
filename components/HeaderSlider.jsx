import React, { useState, useEffect } from "react";
import Link from "next/link";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "لوشن معطر يمنح البشرة ترطيبًا يدوم طويلًا مع عطر أنيق ولمسة ناعمة، مناسب للاستخدام اليومي",
      offer: "PARIS : Perfumed Body Lotion",
      buttonText1: "إشتري الآن",
      buttonText2: "Find more",
      imgSrc: assets.header_paris,
    },
    {
      id: 2,
      title: "كريم للجسم بتركيبة مغذية يساعد على ترطيب البشرة وحمايتها من الجفاف، ليمنحها ملمسًا ناعمًا وصحيًا",
      offer: "Clere : Body Cream",
      buttonText1: "تسوق الآن",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_clere,
    },
    {
      id: 3,
      title: "زيت شعر غني بخلاصة البصل يساعد على تغذية الشعر وتقوية جذوره، ويمنحه مظهرًا أكثر كثافة ولمعانًا مع الاستخدام المنتظم.",
      offer: "REVEL : Onion Enriched Hair Oil",
      buttonText1: "أطلب الآن",
      buttonText2: "Learn More",
      imgSrc: assets.header_revel_oil,
    },
    {
      id: 4,
      title: "لوشن مرطب بتركيبة غنية يساعد على ترطيب البشرة بعمق، ويمنحها نعومة ومرونة طوال اليوم",
      offer: "Levia : Body Lotion Deep Moisturizing",
      buttonText1: "إشتري الآن",
      buttonText2: "See Details",
      imgSrc: assets.header_levia,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] dark:bg-slate-800 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold dark:text-white">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <Link href="/all-products" className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium text-center">
                  {slide.buttonText1}
                </Link>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium dark:text-white dark:hover:text-orange-600 transition">
                  {slide.buttonText2}
                  <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30 dark:bg-gray-600/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
