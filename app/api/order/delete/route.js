import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { orderId } = await request.json();

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const isSeller = await authSeller(userId);
        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (!orderId || typeof orderId !== "string" || orderId.trim().length !== 24) {
            return NextResponse.json({ success: false, message: "Invalid order id" }, { status: 400 });
        }

        await connectDB();
        const order = await Order.findByIdAndDelete(orderId.trim());

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
