import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/User";
import Order from "@/models/Order";
import connectDB from "@/config/db";


export async function POST(request) {

    try {
        const { userId } = getAuth(request);
        const { items, address, customName, customPhone } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 })
        }

        if ((!address && !customPhone) || items.length === 0) {
            return NextResponse.json({ success: false, message: "invalid data and items are required" })
        }

        // Connect to database first
        await connectDB();

        // calculate amount using items - fixed async reduce
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return NextResponse.json({ success: false, message: `Product ${item.product} not found` })
            }
            amount += product.offerPrice * item.quantity;
        }

        // Create order directly
        const order = await Order.create({
            userId,
            items,
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

        return NextResponse.json({ success: true, message: "order placed successfully", orderId: order._id })
    } catch (error) {
        console.log("Order creation error:", error)
        return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

}