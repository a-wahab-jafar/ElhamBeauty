import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { assets } from "@/assets/assets";
import Footer from "@/components/seller/Footer";
import ApproveOrderButton from "@/components/seller/ApproveOrderButton";
import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import Product from "@/models/Product";

const currency = process.env.NEXT_PUBLIC_CURRENCY ? `${process.env.NEXT_PUBLIC_CURRENCY} ` : "";

const serializeId = (value) => {
    if (value && typeof value.toString === "function") {
        return value.toString();
    }
    return value;
};

const getOrderDetails = async (orderId) => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/seller");
    }

    const isSeller = await authSeller(userId);

    if (!isSeller) {
        redirect("/seller");
    }

    await connectDB();

    const order = await Order.findById(orderId).lean();

    if (!order) {
        return null;
    }

    const serializedOrder = {
        ...order,
        _id: serializeId(order._id),
        items: order.items?.map((item) => ({
            ...item,
            product: serializeId(item.product),
        })) || [],
    };

    const productIds = serializedOrder.items.map((item) => item.product).filter(Boolean);
    const products = productIds.length
        ? await Product.find({ _id: { $in: productIds } }).lean()
        : [];

    const productMap = Object.fromEntries(
        products.map((product) => [serializeId(product._id), {
            ...product,
            _id: serializeId(product._id),
        }])
    );

    return { order: serializedOrder, productMap };
};

export default async function OrderDetailPage({ params }) {
    const { id } = await params;
    const details = await getOrderDetails(id);

    if (!details) {
        notFound();
    }

    const { order, productMap } = details;

    return (
        <div className="flex-1 min-h-screen overflow-scroll flex flex-col justify-between text-sm">
            <div className="md:p-10 p-4 space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-medium">Order details</h2>
                        <p className="text-gray-500">Order ID: {order._id}</p>
                    </div>
                    <Link
                        href="/seller/orders"
                        className="inline-flex w-fit items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Back to orders
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="rounded-lg border border-gray-300 p-5">
                        <h3 className="mb-4 text-base font-medium">Products</h3>
                        <div className="space-y-4">
                            {order.items?.map((item, index) => {
                                const product = productMap[item.product?.toString()];
                                const imageUrl = Array.isArray(product?.image)
                                    ? product.image[0]
                                    : product?.image;

                                return (
                                    <div key={`${item.product}-${index}`} className="flex items-start gap-3 rounded-md border border-gray-200 p-3">
                                        <img
                                            src={imageUrl || assets.box_icon.src}
                                            alt={product?.name || "Product image"}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{product?.name || "Product"}</p>
                                            <p className="mt-1 text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="mt-1 text-sm">{currency}{product?.offerPrice || 0}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-300 p-5 space-y-4">
                        <div>
                            <h3 className="mb-2 text-base font-medium">Order summary</h3>
                            <p><span className="font-medium">Order number:</span> {order._id}</p>
                            <p><span className="font-medium">Status:</span> {order.status}</p>
                            <p><span className="font-medium">Placed on:</span> {new Date(order.date).toLocaleString()}</p>
                            <p><span className="font-medium">Total:</span> {currency}{order.amount}</p>
                            <div className="mt-4">
                                <ApproveOrderButton orderId={order._id} currentStatus={order.status} />
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 text-base font-medium">Customer info</h3>
                            {order.address && typeof order.address === "object" ? (
                                <div className="space-y-1 text-gray-700">
                                    <p className="font-medium">{order.address.fullName}</p>
                                    <p>{order.address.area}</p>
                                    <p>{`${order.address.city}, ${order.address.state}`}</p>
                                    <p>{order.address.phoneNumber}</p>
                                </div>
                            ) : (
                                <div className="space-y-1 text-gray-700">
                                    <p className="font-medium">{order.customName || "WhatsApp order"}</p>
                                    <p>{order.customPhone || "Phone not provided"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
