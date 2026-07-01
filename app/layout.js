import { Outfit, Tajawal } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"], variable: "--font-outfit" });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ["300", "400", "500", "700"], variable: "--font-arabic" });

export const metadata = {
  title: "Elham - Beauty",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.variable} ${tajawal.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`} >
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
