import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" });
        }

        await connectDB();

        const status = request.nextUrl.searchParams.get("status");
        const filter = {};
        if (status) {
            filter.status = status;
        }

        const orders = await Order.find(filter).populate("items.product");
        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}