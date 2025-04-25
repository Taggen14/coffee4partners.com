"use client";

import type * as React from "react";
import {
  GalleryVerticalEnd,
  // Inbox,
  // LayoutDashboard,s
  Package,
  // Settings2,
  ShoppingCart,
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
    // {
    //   title: "Dashboard",
    //   url: "/admin",
    //   icon: LayoutDashboard,
    //   items: [
    //     {
    //       title: "Overview",
    //       url: "/admin",
    //     },
    //     {
    //       title: "Analytics",
    //       url: "/admin/analytics",
    //     },
    //   ],
    // },
    {
      title: "Produkter",
      url: "/admin/products",
      icon: Package,
      items: [
        {
          title: "Alla Produkter",
          url: "/admin/products",
        },
        // {
        //   title: "Categories",
        //   url: "/admin/products/categories",
        // },
        // {
        //   title: "Features",
        //   url: "/admin/products/features",
        // },
      ],
    },
    {
      title: "Ordrar",
      url: "/admin/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "Alla Ordrar",
          url: "/admin/orders",
        },
        {
          title: "Pågående",
          url: "/admin/orders/pending",
        },
        {
          title: "Levererade",
          url: "/admin/orders/shipped",
        },
      ],
    },
    {
      title: "Lägg till Kund/Admin",
      url: "/admin/add-user",
      icon: UserRoundPlus,
      items: [
        {
          title: "Ny Kund",
          url: "/admin/add-user/customer",
        },
        {
          title: "Ny Admin",
          url: "/admin/add-user/admin",
        },
      ],
    },
    // {
    //   title: "Förfrågningar",
    //   url: "/admin/inquiries",
    //   icon: Inbox,
    //   items: [
    //     {
    //       title: "Alla Förfrågningar",
    //       url: "/admin/inquiries",
    //     },
    //     {
    //       title: "Olästa",
    //       url: "/admin/inquiries/unread",
    //     },
    //     {
    //       title: "Arkiverade",
    //       url: "/admin/inquiries/archived",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "/admin/settings",
    //     },
    //     {
    //       title: "Store",
    //       url: "/admin/settings/store",
    //     },
    //     {
    //       title: "Shipping",
    //       url: "/admin/settings/shipping",
    //     },
    //   ],
    // },
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
