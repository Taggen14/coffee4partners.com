"use client";

import type * as React from "react";
import {
  GalleryVerticalEnd,
  Package,
  UserRoundPlus,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { TeamSwitcher } from "@/components/admin/team-switcher";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Produkter",
      url: "/admin/products",
      icon: Package,
      items: [
        {
          title: "Alla Produkter",
          url: "/admin/products",
        },
        {
          title: "Kategorier",
          url: "/admin/products/categories",
        },
        {
          title: "Underkategorier",
          url: "/admin/products/sub-categories",
        },
      ],
    },
    // {
    //   title: "Ordrar",
    //   url: "/admin/orders",
    //   icon: ShoppingCart,
    //   items: [
    //     {
    //       title: "Alla Ordrar",
    //       url: "/admin/orders",
    //     },
    //     {
    //       title: "Pågående",
    //       url: "/admin/orders/pending",
    //     },
    //     {
    //       title: "Levererade",
    //       url: "/admin/orders/shipped",
    //     },
    //   ],
    // },
    {
      title: "Konton",
      url: "/admin/",
      icon: UserRoundPlus,
      items: [
        {
          title: "Hantera konton",
          url: "/admin/accounts",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.fullName || "Admin Användare",
            email: user?.emailAddresses[0]?.emailAddress || "",
            avatar: user?.imageUrl || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
