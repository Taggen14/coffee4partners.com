"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import content from "@/app/sv.json";
import { usePathname } from "next/navigation";
import ShopDropdownNavMenu from "./shop-dropdown-nav-menu";

const Navbar = () => {
  const { links } = content.layout.header;
  const pathname = usePathname();

  return (
    <NavigationMenu className="items-start">
      <NavigationMenuList className="flex flex-col md:flex-row items-start px-5 md:px-0 gap-0">
        {links.map((link, i) => (
          <NavigationMenuItem key={i}>
            {link.slug === 'shop' ?
              <ShopDropdownNavMenu title={link.title} />
              :
              <NavigationMenuLink
                href={link.route}
                className={`relative text-xl whitespace-nowrap transition-colors duration-300 inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-secondary-foreground after:transition-width after:duration-300 hover:after:w-full 
                ${link.slug === "/" ? pathname === "/"
                    ? "text-secondary-foreground"
                    : "text-background"
                    : pathname.includes(link.slug)
                      ? "text-secondary-foreground"
                      : "text-background"
                  }`}
              >
                {link.title}
              </NavigationMenuLink>
            }
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
