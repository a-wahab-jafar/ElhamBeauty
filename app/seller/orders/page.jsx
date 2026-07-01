'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const Orders = () => {

    const { currency , getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchSellerOrders = async () => {
        try {

            const token = await getToken();
            const { data } = await axios.get("/api/order/seller-order", {
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
    }

    useEffect(() => {
        if (user) {
            fetchSellerOrders();
        }
    }, [user]);

    const handleApprove = async (orderId) => {
        try {
            const token = await getToken();
            const { data } = await axios.post(
                "/api/order/approve",
                { orderId: orderId?.toString()?.trim() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (data.success) {
                toast.success("Order approved successfully");
                router.push("/seller/approved-orders");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {loading ? <Loading /> : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.map((order, index) => (
                        <div key={order._id || index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300">
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
                                    <span>Items : {order.items.length}</span>
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
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href={`/seller/orders/${order._id}`}
                                        className="inline-flex w-fit items-center justify-center rounded-md bg-pink-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
                                    >
                                        View
                                    </Link>
                                    {order.status !== "approved" ? (
                                        <button
                                            onClick={() => handleApprove(order._id)}
                                            className="inline-flex w-fit items-center justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-600"
                                        >
                                            Approve
                                        </button>
                                    ) : (
                                        <span className="inline-flex w-fit items-center justify-center rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
                                            Approved
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="flex flex-col">
                                    <span>Method : COD</span>
                                    <span>Date : {new Date(order.date).toLocaleDateString()}</span>
                                    <span>Payment : Pending</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
            <Footer />
        </div>
    );
};

export default Orders;