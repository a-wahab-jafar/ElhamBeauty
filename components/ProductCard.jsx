import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer text-[var(--foreground)]"
        >
            <div className="cursor-pointer group relative bg-[var(--surface-muted)] rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
                {product.status && product.status !== 'available' ? (
                    <div
                        className={
                            `absolute top-2 left-2 max-sm:top-1 max-sm:left-1 px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold shadow-sm ` +
                            (product.status === 'coming_soon'
                                ? 'bg-green-600/85 text-white'
                                : 'bg-red-600/85 text-white')
                        }
                    >
                        <span>{product.status === 'coming_soon' ? 'Coming Soon' : 'Out of Stock'}</span>
                    </div>
                ) : null}
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-[var(--foreground)]/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-[var(--foreground)]/70 border border-[var(--border)] rounded-full text-xs hover:bg-[var(--surface-muted)] transition">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard