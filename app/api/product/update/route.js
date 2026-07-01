import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/config/db";

export async function PUT(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { productId, status } = await request.json();

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" });
    }

    if (!status) {
      return NextResponse.json({ success: false, message: "Status is required" });
    }

    await connectDB();

    const updated = await Product.findOneAndUpdate(
      { _id: productId, userId },
      { $set: { status } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: "Product not found or not authorized" });
    }

    return NextResponse.json({ success: true, message: "Product updated", product: updated });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, message: "Failed to update product" });
  }
}
