'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppContext } from "@/context/AppContext";

const ApproveOrderButton = ({ orderId, currentStatus }) => {
    const { getToken } = useAppContext();
    const router = useRouter();

    const handleApprove = async () => {
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

    if (currentStatus === "approved") {
        return (
            <span className="inline-flex items-center rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
                Approved
            </span>
        );
    }

    return (
        <button
            onClick={handleApprove}
            className="inline-flex items-center justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-600"
        >
            Approve Order
        </button>
    );
};

export default ApproveOrderButton;
