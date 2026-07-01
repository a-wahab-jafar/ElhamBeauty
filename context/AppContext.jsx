'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth ,useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { sanitizeCartItems } from "@/lib/cartUtils.mjs";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY ? `${process.env.NEXT_PUBLIC_CURRENCY} ` : ''
    const router = useRouter()

    const { user } = useUser()
    const { getToken } = useAuth()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [theme, setTheme] = useState("light")

    const fetchProductData = async () => {
        try {
            const { data } = await axios.get("/api/product/list")

            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUserData = async () => {
        try {
            if (user.publicMetadata.role === "seller") {
            setIsSeller(true)
        }

        const token = await getToken()

        const {data} = await axios.get("/api/user/data", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (data.success) {
            setUserData(data.user)
            setCartItems(sanitizeCartItems(data.user.cartItems))
        } else {
            toast.error(data.message)
        }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const addToCart = async (itemId) => {

        let cartData = sanitizeCartItems(structuredClone(cartItems));
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        

        if (user) {
            try {
                const token = await getToken()
                await axios.post("/api/cart/update", { cartData }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success("Item added to cart")
            } catch (error) {
                toast.error(error.message)
            }
        }

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = sanitizeCartItems(structuredClone(cartItems));
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(sanitizeCartItems(cartData))
        if (user) {
            try {
                const token = await getToken()
                await axios.post("/api/cart/update", { cartData }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                toast.success("cart updated successfully")
            } catch (error) {
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        const sanitizedCartItems = sanitizeCartItems(cartItems);
        for (const items in sanitizedCartItems) {
            if (sanitizedCartItems[items] > 0) {
                totalCount += sanitizedCartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        const sanitizedCartItems = sanitizeCartItems(cartItems);
        for (const items in sanitizedCartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (sanitizedCartItems[items] > 0 && itemInfo) {
                totalAmount += itemInfo.offerPrice * sanitizedCartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
    }

    useEffect(() => {
        const storedTheme = window.localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        const initialTheme = storedTheme || (prefersDark ? "dark" : "light")
        setTheme(initialTheme)
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        document.documentElement.style.colorScheme = theme
        window.localStorage.setItem("theme", theme)
    }, [theme])

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        if (user) {
            fetchUserData()
        }
    }, [user])

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount,
        theme, toggleTheme
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}