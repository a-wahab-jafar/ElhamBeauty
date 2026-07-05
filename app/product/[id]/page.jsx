"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ProductDetailSkeleton } from "@/components/Fallback";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();

  const { products, router, addToCart, fetchProductData } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const quantityValue = Number(productData?.quantity);
  const hasExplicitQuantity = Number.isFinite(quantityValue);
  const isOutOfStock = hasExplicitQuantity ? quantityValue <= 0 : false;

  const statusLabel =
    productData?.status === "coming_soon"
      ? "Coming Soon"
      : productData?.status === "out_of_stock" || isOutOfStock
        ? "Out of Stock"
        : null;

  const statusClasses =
    productData?.status === "coming_soon"
      ? "bg-green-600/80 text-white"
      : productData?.status === "out_of_stock" || isOutOfStock
        ? "bg-red-600/80 text-white"
        : "";

  const isDisabled =
    productData?.status === "coming_soon" ||
    productData?.status === "out_of_stock" ||
    isOutOfStock;

  const handleAddToCartClick = () => {
    if (isDisabled) {
      const message =
        productData?.status === "coming_soon"
          ? "🟢 This product is Coming Soon"
          : "🔴 This product is Out of Stock";
      toast.error(message);
      return;
    }
    addToCart(productData._id);
  };

  const handleBuyNowClick = () => {
    if (isDisabled) {
      const message =
        productData?.status === "coming_soon"
          ? "🟢 This product is Coming Soon"
          : "🔴 This product is Out of Stock";
      toast.error(message);
      return;
    }
    addToCart(productData._id);
    router.push("/cart");
  };

  const loadProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        const product = data.products.find((item) => item._id === id);
        setProductData(product || null);
        return;
      }
    } catch (error) {
      console.error("Failed to load product details", error);
    }

    const fallbackProduct = products.find((item) => item._id === id);
    setProductData(fallbackProduct || null);
  };

  useEffect(() => {
    loadProductData();
  }, [id, products.length]);

  return productData ? (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="relative rounded-lg overflow-hidden bg-[var(--surface)] mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover"
                width={1280}
                height={720}
              />
              {statusLabel ? (
                <div
                  className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-semibold shadow ${statusClasses}`}
                >
                  {statusLabel}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-[var(--surface-muted)]"
                >
                  <Image
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover"
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-[var(--foreground)]/90 mb-4">
              {productData.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p className="text-[var(--foreground)]/70">(4.5)</p>
            </div>
            <p className="text-[var(--foreground)]/70 mt-3">
              {productData.description}
            </p>
            <p className="text-3xl font-medium mt-6 text-[var(--foreground)]">
              SDG {productData.offerPrice}
              <span className="text-base font-normal text-[var(--foreground)]/60 line-through ml-2">
                SDG {productData.price}
              </span>
            </p>
            <hr className="border-t border-[var(--border)] my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-[var(--foreground)]/70 font-medium">
                      Brand
                    </td>
                    <td className="text-[var(--foreground)]/60 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--foreground)]/70 font-medium">
                      Color
                    </td>
                    <td className="text-[var(--foreground)]/60 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-[var(--foreground)]/70 font-medium">
                      Category
                    </td>
                    <td className="text-[var(--foreground)]/60">
                      {productData.category}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-[var(--foreground)]/70 font-medium">
                      Quantity
                    </td>
                    <td className="text-[var(--foreground)]/60">
                      {isOutOfStock
                        ? "Out of stock"
                        : `${productData.quantity} available`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={handleAddToCartClick}
                disabled={isDisabled}
                className={`w-full py-3.5 transition relative flex items-center justify-center gap-2
                                ${
                                  isDisabled
                                    ? productData?.status === "coming_soon"
                                      ? "bg-green-600/60 text-white cursor-not-allowed"
                                      : "bg-red-600/60 text-white cursor-not-allowed"
                                    : "bg-[var(--surface)] text-[var(--foreground)]/90 hover:bg-[var(--surface-muted)] border border-[var(--border)]"
                                }`}
              >
                {isDisabled && <span className="text-2xl font-bold">✕</span>}
                أضف إلى السلة
              </button>
              <button
                onClick={handleBuyNowClick}
                disabled={isDisabled}
                className={`w-full py-3.5 transition flex items-center justify-center gap-2
                                ${
                                  isDisabled
                                    ? productData?.status === "coming_soon"
                                      ? "bg-green-600/60 text-white cursor-not-allowed"
                                      : "bg-red-600/60 text-white cursor-not-allowed"
                                    : "bg-orange-500 text-white hover:bg-orange-600"
                                }`}
              >
                {isDisabled && <span className="text-2xl font-bold">✕</span>}
                إشتري الآن
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              المزيد من{" "}
              <span className="font-medium text-orange-600">المنتجات</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button
            onClick={() => {
              router.push("/all-products");
            }}
            className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
          >
            المزيد
          </button>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <ProductDetailSkeleton />
  );
};

export default Product;
