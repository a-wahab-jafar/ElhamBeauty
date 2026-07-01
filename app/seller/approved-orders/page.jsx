'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ApprovedOrders = () => {
    const { currency, getToken, user } = useAppContext();
    const router = useRouter();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApprovedOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get("/api/order/seller-order?status=approved", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data.success) {
                setOrders(data.orders);
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (orderId) => {
        try {
            const token = await getToken();
            const { data } = await axios.post(
                "/api/order/delete",
                { orderId: orderId?.toString()?.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                setOrders((prev) => prev.filter((order) => order._id !== orderId));
                toast.success("Approved order deleted successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchApprovedOrders();
        }
    }, [user]);

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-lg font-medium">Approved Orders</h2>
                        <p className="text-gray-500">Orders approved by you are shown here.</p>
                    </div>
                    <button
                        onClick={() => router.push('/seller/orders')}
                        className="inline-flex w-fit items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Back to Orders
                    </button>
                </div>
                <div className="max-w-4xl rounded-md space-y-4">
                    {orders.length === 0 ? (
                        <div className="rounded-md border border-gray-300 p-6 text-center text-gray-600">
                            No approved orders found.
                        </div>
                    ) : orders.map((order, index) => (
                        <div key={order._id || index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300 bg-white shadow-sm rounded-md">
                            <div className="flex-1 flex gap-5 max-w-80">
                                <Image
                                    className="max-w-16 max-h-16 object-cover"
                                    src={assets.box_icon}
                                    alt="box_icon"
                                />
                                <p className="flex flex-col gap-3">
                                    <span className="font-medium">
                                        {order.items.map((item) => item.product?.name ? `${item.product.name} x ${item.quantity}` : `Item x ${item.quantity}`).join(", ")}
                                    </span>
                                    <span>Items: {order.items.length}</span>
                                </p>
                            </div>
                            <div>
                                {order.address && typeof order.address === "object" ? (
                                    <p>
                                        <span className="font-medium">{order.address.fullName}</span>
                                        <br />
                                        <span>{order.address.area}</span>
                                        <br />
                                        <span>{`${order.address.city}, ${order.address.state}`}</span>
                                        <br />
                                        <span>{order.address.phoneNumber}</span>
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-medium">{order.customName || "WhatsApp order"}</span>
                                        <br />
                                        <span>{order.customPhone || "Phone not provided"}</span>
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 my-auto">
                                <p className="font-medium">{currency}{order.amount}</p>
                                <p className="text-xs text-gray-500">Order ID: {order._id}</p>
                                <button
                                    onClick={() => handleDelete(order._id)}
                                    className="inline-flex w-fit items-center justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default ApprovedOrders;
