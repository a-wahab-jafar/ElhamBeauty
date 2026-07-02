import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/config/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const contentType = request.headers.get("content-type") || "";
    let payload = {};
    let files = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      payload = Object.fromEntries(formData.entries());
      files = formData.getAll("images");
    } else {
      payload = await request.json();
    }

    const { productId, status, name, description, category, price, offerPrice } = payload;

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" });
    }

    const updateData = {};

    if (status) {
      updateData.status = status;
    }

    if (typeof name === "string" && name.trim()) {
      updateData.name = name.trim();
    }

    if (typeof description === "string" && description.trim()) {
      updateData.description = description.trim();
    }

    if (typeof category === "string" && category.trim()) {
      updateData.category = category.trim();
    }

    if (price !== undefined && price !== "") {
      updateData.price = Number(price);
    }

    if (offerPrice !== undefined && offerPrice !== "") {
      updateData.offerPrice = Number(offerPrice);
    }

    if (files.length > 0) {
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          if (typeof file?.arrayBuffer !== "function") {
            return null;
          }

          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
            stream.end(buffer);
          });
        })
      );

      const uploadedImages = uploadResults.filter(Boolean).map((result) => result.secure_url);
      if (uploadedImages.length > 0) {
        updateData.image = uploadedImages;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: false, message: "No valid updates provided" });
    }

    await connectDB();

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found or not authorized" });
    }

    if (existingProduct.userId && existingProduct.userId !== userId) {
      return NextResponse.json({ success: false, message: "Product not found or not authorized" });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { ...updateData, userId } },
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
