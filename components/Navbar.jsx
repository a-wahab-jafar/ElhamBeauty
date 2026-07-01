"use client"
import React from "react";
import { assets, BagIcon, CartIcon, HomeIcon, BoxIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user, theme, toggleTheme } = useAppContext();
  const {openSignIn} = useClerk();
  const isDarkMode = theme === "dark";

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-[var(--border)] bg-[var(--surface)]/90 text-[var(--foreground)] shadow-sm">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-[var(--foreground)]/80 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-[var(--foreground)]/80 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-[var(--foreground)]/80 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-[var(--foreground)]/80 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 rounded-full hover:bg-[var(--surface-muted)] transition">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <button onClick={toggleTheme} className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm transition hover:bg-[var(--surface-muted)]" aria-label="Toggle theme">
          <span>{isDarkMode ? "☀️" : "🌙"}</span>
          <span className="text-xs">{isDarkMode ? "Light" : "Dark"}</span>
        </button>
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {
         user
          ? <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label= "Cart" labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label= "My Orders" labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
            </UserButton.MenuItems>
          </UserButton>
          </>
           : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-[var(--foreground)]/80 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
        }
      </ul>

      <div className="flex items-center md:hidden gap-3">
        <button onClick={toggleTheme} className="rounded-full border border-[var(--border)] bg-[var(--surface)] p-2 text-sm transition hover:bg-[var(--surface-muted)]" aria-label="Toggle theme">
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 rounded-full hover:bg-[var(--surface-muted)] transition">Seller Dashboard</button>}
        {
         user
          ? <>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label= "Home" labelIcon={<HomeIcon />} onClick={()=> router.push('/')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label= "Products" labelIcon={<BoxIcon />} onClick={()=> router.push('/all-products')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label= "Cart" labelIcon={<CartIcon />} onClick={()=> router.push('/cart')}/>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label= "My Orders" labelIcon={<BagIcon />} onClick={()=> router.push('/my-orders')}/>
            </UserButton.MenuItems>
          </UserButton>
          </>
           : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-[var(--foreground)]/80 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>
        }
      </div>
    </nav>
  );
};

export default Navbar;