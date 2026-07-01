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
      return toast.error("Please enter your name");
    }
    if (!userNumber.trim()) {
      return toast.error("Please enter your phone number");
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
        window.open(`https://wa.me/249905081728?text=${encodedMessage}`, "_blank");
        
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
          Order Summary
        </h2>
      </div>
      <hr className="border-gray-500/30 my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full outline-none p-2.5 text-gray-600 border"
          />
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="w-full outline-none p-2.5 text-gray-600 border"
          />
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-lg md:text-xl font-medium">
            <p>Total</p>
            <p>{currency}{getCartAmount()}</p>
          </div>
        </div>
      </div>

      <button onClick={handleOrderViaWhatsApp} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 flex items-center justify-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.025 0-2.05-.312-2.955-.924-.467-.309-.923-.717-1.286-1.196a7.48 7.48 0 0 0-1.255-1.482c-.542-.601-1.114-1.091-1.713-1.461-1.303-.81-2.764-1.245-4.242-1.245-3.728 0-6.77 3.042-6.77 6.77 0 1.193.314 2.36.91 3.365l1.449 2.305c.55.878 1.287 1.606 2.178 2.1.891.495 1.886.755 2.892.755 3.728 0 6.77-3.042 6.77-6.77 0-1.193-.313-2.36-.91-3.365l-1.449-2.305c-.55-.878-1.287-1.606-2.178-2.1-.89-.495-1.886-.755-2.892-.755z"/>
        </svg>
        Order via WhatsApp
      </button>
    </div>
  );
};

export default OrderSummary;