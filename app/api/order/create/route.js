import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/User";
import Order from "@/models/Order";
import connectDB from "@/config/db";

function normalizeOrderItems(items = []) {
    return (Array.isArray(items) ? items : [])
        .filter((item) => item && item.product)
        .map((item) => ({
            product: String(item.product),
            quantity: Number(item.quantity),
        }))
        .filter((item) => Number.isFinite(item.quantity) && item.quantity > 0);
}


export async function POST(request) {

    try {
        const { userId } = getAuth(request);
        const { items, address, customName, customPhone } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 })
        }

        const normalizedItems = normalizeOrderItems(items);

        if ((!address && !customPhone) || normalizedItems.length === 0) {
            return NextResponse.json({ success: false, message: "invalid data and items are required" })
        }

        // Connect to database first
        await connectDB();

        let amount = 0;
        const validItems = [];
        const invalidItems = [];

        for (const item of normalizedItems) {
            const product = await Product.findById(item.product);
            if (!product) {
                invalidItems.push(item);
                continue;
            }
            amount += product.offerPrice * item.quantity;
            validItems.push(item);
        }

        if (validItems.length === 0) {
            return NextResponse.json({ success: false, message: "No valid products found in your cart", invalidItems }, { status: 400 })
        }

        const order = await Order.create({
            userId,
            items: validItems,
            amount,
            address: address || "whatsapp-order",
            date: new Date().getTime(),
            customName,
            customPhone
        });

        await inngest.send({
            name: "order/created",
            data: {
                userId,
                items,
                amount,
                address,
                date: new Date()
            }
        });

        // clear user cart
        const user =  await User.findById(userId);
        if (user) {
            user.cartItems = {};
            await user.save();
        }

        return NextResponse.json({ success: true, message: "order placed successfully", orderId: order._id, removedItems: invalidItems })
    } catch (error) {
        console.log("Order creation error:", error)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

}