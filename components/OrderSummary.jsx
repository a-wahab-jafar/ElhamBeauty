import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, getToken, user, cartItems, setCartItems } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get("/api/user/get-address", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.success) {
        setUserAddresses(data.addresses)
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0])
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const handleOrderViaWhatsApp = async () => {
    if (!userName.trim()) {
      return toast.error("الرجاء إدخال إسمك");
    }
    if (!userNumber.trim()) {
      return toast.error("الرجاء إدخال رقم هاتفك");
    }

    let cartItemsArray = Object.keys(cartItems).map((key) => ({
      product: key,
      quantity: cartItems[key]
    }));
    cartItemsArray = cartItemsArray.filter((item) => item.quantity > 0);

    if (cartItemsArray.length === 0) {
      return toast.error("Your cart is empty");
    }

    try {
      const token = await getToken();

      // Create order in database first
      const { data } = await axios.post("/api/order/create", {
        address: selectedAddress?._id || "whatsapp-order",
        items: cartItemsArray,
        customName: userName,
        customPhone: userNumber
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.success) {
        const orderId = data.orderId;
        const totalAmount = getCartAmount();

        if (data.removedItems?.length > 0) {
          toast.success(`Some items were removed from your cart before checkout.`);
        }
        
        let message = `Hello! I would like to place an order.\n\n`;
        message += `*Order ID: ${orderId}*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${userName}\n`;
        message += `Phone: ${userNumber}\n\n`;
        message += `*Order Summary:*\n`;
        message += `Items: ${getCartCount()}\n`;
        message += `*Total: ${currency}${totalAmount}*\n\n`;
        message += `Please confirm this order.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/201040450320?text=${encodedMessage}`, "_blank");
        
        // Clear cart and show success
        toast.success("Order created! Opening WhatsApp...");
        setCartItems({});
        setUserName("");
        setUserNumber("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to create order");
    }
  };

  useEffect(() => {
    if (user) {

      fetchUserAddresses();
    }
  }, [user]);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
        <h2 className="text-xl md:text-2xl font-medium text-gray-700">
          ملخص الطلب
        </h2>
      </div>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            إسمك
          </label>
          <input
            type="text"
            placeholder="ادخل اسمك هنا"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full outline-none p-2.5 text-gray-600 border"
          />
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            ادخل رقم هاتفك هنا
          </label>
          <input
            type="tel"
            placeholder="ادخل رقم هاتفك هنا"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="w-full outline-none p-2.5 text-gray-600 border"
          />
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-lg md:text-xl font-medium">
            <p>المجموع</p>
            <p>{currency}{getCartAmount()}</p>
          </div>
        </div>
      </div>

      <button onClick={handleOrderViaWhatsApp} className="w-full bg-emerald-600 text-white py-3 mt-5 hover:bg-emerald-700 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 286.2 32 231.9 32 132.2 32 44.7 107.1 44.7 201.6c0 35.7 10.3 68.8 28.2 97.1L32.5 472l175.2-48.4c28.7 15.7 61.2 24.1 94.8 24.1 99.8 0 187.3-75.1 187.3-169.6 0-103.3-84.5-169.4-189-169.4zm-73.1 251.1c-3.8 10.4-22.7 19.9-34.6 21.2-9.3 1-20.9 1.5-32.8-1.2-25.5-5.5-50.4-16.6-70.7-31.4l-33.6 8.9-9.2-28.9 9.4-25.9-4.1-6.5c-30.7-14.1-53.9-39.7-66.9-68.5-8.3-18.4-12.7-38.2-12.7-58.8 0-64.3 53.6-116.4 120.3-116.4 31.9 0 62 12.4 84.6 35 22.8 22.9 35.4 53.5 35.2 84.9 0 64.3-52.9 116.1-117.7 116.1-17.9 0-35-5.5-49.4-15.7l-34.5 9.1 7.3 22.6c20.1 6.8 43 10.4 66.5 10.4 86.6 0 157.1-61.2 170.5-144.2 1.9-13 2.8-26.2 2.8-39.3 0-46.6-18.1-90.3-50.8-123.1C305.2 54.4 270.2 40 231.9 40 132.2 40 44.7 115.1 44.7 209.6c0 35.7 10.3 68.8 28.2 97.1L32.5 472l175.2-48.4c28.8 15.7 61.4 24 94.8 24h.1c99.8 0 187.3-75.1 187.3-169.6zM342 202.5c-5.7-2.8-34.1-16.8-39.4-18.7-5.4-1.9-9.3-2.8-13.2 2.8-3.8 5.6-14.6 18.7-17.9 22.6-3.3 3.8-6.5 4.3-12.1 1.5-5.7-2.8-23.9-8.8-45.4-28-16.8-14.8-28.2-33.1-31.5-38.7-3.3-5.7-.4-8.7 2.4-11.5 2.4-2.4 5.7-6.3 8.5-9.5 2.8-3.3 3.7-5.6 5.7-9.3 2.1-3.7 1-6.8-.5-9.5-1.5-2.7-13-31.3-17.8-42.8-4.7-11-9.4-9.5-13.2-9.7-3.8-.2-8-.3-12.2-.3-4.2 0-10.8 1.6-16.5 7.3-5.7 5.7-21.8 21.4-21.8 51.8 0 30.4 14.1 59 16.1 63.1 2 4.1 27.9 42.6 67.6 58.3 9.7 4.2 17.8 6.6 24 8.4 10 3.3 18.5 2.9 25.5 1.7 7.9-1.2 24-9.9 27.4-19.6 3.5-9.7 3.5-18 2.5-19.8-1-1.8-3.7-2.8-7.2-4.6z"/>
        </svg>
        اطلب عبر واتساب
      </button>
    </div>
  );
};

export default OrderSummary;