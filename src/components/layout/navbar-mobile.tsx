"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, Menu } from "lucide-react";
import { CldImage } from "next-cloudinary";
import content from "@/app/sv.json";
import Navbar from "./navbar";

const NavbarMobile = () => {
  const { usps } = content.layout.header;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-secondary gap-0">
        <SheetHeader className="px-1 pt-6 gap-0">
          <SheetTitle>
            <div className="flex justify-center">
              <CldImage
                src={`https://res.cloudinary.com/CLOUD_NAME/image/upload/v1743062927/coffee4partners_logotyp_x36_2x_m2lkv8.png`}
                alt={`coffee4partners logo`}
                width={300}
                height={300}
                preserveTransformations
              />
            </div>
          </SheetTitle>
          <SheetDescription className="flex flex-wrap space-x-3 text-[0.6rem] justify-center text-secondary-foreground">
            {usps.map((usp, i) => (
              <span key={i} className="flex items-center gap-[1px]">
                <Check style={{ width: "0.8rem" }} />
                {usp}
              </span>
            ))}
          </SheetDescription>
        </SheetHeader>
        <Navbar />
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
