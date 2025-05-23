"use client";

import React, { useState } from "react";
import content from "@/app/sv.json";
import { Check, Search, User } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Navbar from "./navbar";
import NavbarMobile from "./navbar-mobile";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CartSheet } from "../shop/cart-sheet";
import { Button } from "../ui/button";
import { SearchSheet } from "../shop/search-sheet";

const Header = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const { usps, landingPage } = content.layout.header;
  const pathname = usePathname();
  const router = useRouter();
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return (
    <>
      <header
        className={`relative text-secondary-foreground flex flex-col items-center ${pathname === "/" && "h-[500px]"}`}
      >
        <div className="md:flex gap-5 text-xs hidden z-20 bg-secondary justify-center w-full py-1">
          {usps.map((usp, i) => (
            <span key={i} className="flex items-center gap-1">
              <Check style={{ width: "1rem" }} />
              {usp}
            </span>
          ))}
        </div>

        <div
          className={`relative flex items-center p-5 pl-0 justify-between w-full z-10 ${pathname !== "/" && "bg-secondary"}`}
        >
          <Link href={"/"}>
            <CldImage
              src={`https://res.cloudinary.com/${cloudName}/image/upload/v1743062927/coffee4partners_logotyp_x36_2x_m2lkv8.png`}
              alt="coffee4partners logo"
              width={300}
              height={300}
              preserveTransformations
            />
          </Link>
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* search-, sign-in-, carticons */}
          <div className="flex gap-5">
            <Button
              variant="outlineNavIcons"
              size="icon"
              onClick={() => setCommandOpen(true)}
            >
              <Search style={{ width: 24, height: 24 }} />

              <span className="sr-only">Sök</span>
            </Button>
            <Button
              variant="outlineNavIcons"
              size="icon"
              onClick={() => {
                router.push("/sign-in");
              }}
            >
              <User style={{ width: 24, height: 24 }} />
            </Button>
            <CartSheet />
            <div className="md:hidden">
              <NavbarMobile />
            </div>
          </div>
        </div>

        {/* LANDING PAGE */}
        {pathname === "/" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src={`https://res.cloudinary.com/${cloudName}/video/upload/v1743065686/coffee-beans_bmf0tt.mp4`}
                type="video/mp4"
              />
            </video>

            <div className="absolute top-0 left-0 w-full h-full bg-black/10" />

            <div className="absolute flex flex-col items-center text-background gap-5">
              <h1 className="text-background font-normal text-5xl">
                {landingPage.title}
              </h1>
              <h2 className="text-background font-normal">
                {landingPage.tagLine}
              </h2>
              <a
                href="/contact"
                className="hover:text-secondary-foreground corner-border group"
              >
                <span>{landingPage.cta}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search Sheet */}
      <SearchSheet open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
};

export default Header;
