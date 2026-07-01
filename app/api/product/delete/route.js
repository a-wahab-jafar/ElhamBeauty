import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/config/db";

export async function DELETE(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" });
    }

    await connectDB();

    const deletedProduct = await Product.findOneAndDelete({
      _id: productId,
      userId,
    });

    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product not found or already removed" });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ success: false, message: "Failed to delete product" });
  }
}
