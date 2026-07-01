import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[var(--surface)] text-[var(--foreground)]">
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-[var(--border)] text-[var(--foreground)]/80">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-[var(--foreground)] mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">About us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Contact us</a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-[var(--foreground)] mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+249-90-508-1728</p>
              <p>elham.beauty617@gmail.com</p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a href="https://www.facebook.com/alham.mhmd.almdwy" aria-label="Facebook" className="inline-flex rounded-full border border-[var(--border)] p-2 hover:bg-[var(--surface-muted)] transition">
                <Image src={assets.facebook_icon} alt="Facebook" className="h-5 w-5" />
              </a>
              <a href="https://wa.me/249905081728" aria-label="WhatsApp" className="inline-flex rounded-full border border-[var(--border)] p-2 hover:bg-[var(--surface-muted)] transition">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.149-.198.297-.768.967-.942 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.786-1.48-1.755-1.653-2.052-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.075-.148-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51l-.572-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.27-.198-.567-.347z"/>
                  <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 2.118.556 4.083 1.53 5.757L2 22l4.34-1.426A9.958 9.958 0 0 0 12.004 22C17.528 22 22 17.52 22 12.004S17.528 2 12.004 2zm0 18.165c-1.763 0-3.439-.484-4.886-1.397l-.35-.206-2.57.845.865-2.506-.228-.363A7.926 7.926 0 0 1 4.02 12.004c0-4.406 3.58-7.987 7.984-7.987 4.405 0 7.986 3.58 7.986 7.987 0 4.405-3.58 7.986-7.986 7.986z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/alhammhmd617?igsh=cTM3MTd1c3gwYXQ=" aria-label="Instagram" className="inline-flex rounded-full border border-[var(--border)] p-2 hover:bg-[var(--surface-muted)] transition">
                <Image src={assets.instagram_icon} alt="Instagram" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Elham-Beauty All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;