'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useMemo, useState } from "react";
import { ProductCardSkeleton } from "@/components/Fallback";

const AllProducts = () => {

    const { products } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map((product) => product.category).filter(Boolean))];
        return ["All", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === "All") {
            return products;
        }

        return products.filter((product) => product.category === selectedCategory);
    }, [products, selectedCategory]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-12 w-full">
                    <div className="flex flex-col items-start">
                        <p className="text-2xl font-medium">All products</p>
                        <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/70" htmlFor="category-filter">
                            Filter by category
                        </label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="rounded border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm focus:outline-none transition"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {products.length === 0 ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => <ProductCard key={index} product={product} />)
                    ) : (
                        <div className="col-span-full py-8 text-center text-gray-500">
                            No products found for this category.
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
