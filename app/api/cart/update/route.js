import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { clampQuantityToStock, sanitizeCartItems } from "@/lib/cartUtils.mjs";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);

        const { cartData } = await request.json();

        await connectDB();
        const user = await User.findById(userId);
        const sanitizedCartItems = sanitizeCartItems(cartData);
        const sanitizedCartData = {};

        for (const [productId, quantity] of Object.entries(sanitizedCartItems)) {
            const product = await Product.findById(productId);
            if (!product) continue;

            const safeQuantity = clampQuantityToStock(quantity, product.quantity ?? 0);
            if (safeQuantity > 0) {
                sanitizedCartData[productId] = safeQuantity;
            }
        }

        user.cartItems = sanitizedCartData;
        await user.save();

        return NextResponse.json({ success: true, message: "Cart updated successfully" })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }) 
    }
}