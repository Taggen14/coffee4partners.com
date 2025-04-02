"use client";

import type * as React from "react";
import {
  GalleryVerticalEnd,
  Inbox,
  LayoutDashboard,
  Package,
  Settings2,
  ShoppingCart,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { TeamSwitcher } from "./team-switcher";

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
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      items: [
        {
          title: "Overview",
          url: "/admin",
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
        },
      ],
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Package,
      items: [
        {
          title: "All Products",
          url: "/admin/products",
        },
        {
          title: "Categories",
          url: "/admin/products/categories",
        },
        {
          title: "Features",
          url: "/admin/products/features",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders",
        },
        {
          title: "Pending",
          url: "/admin/orders/pending",
        },
        {
          title: "Shipped",
          url: "/admin/orders/shipped",
        },
      ],
    },
    {
      title: "Inquiries",
      url: "/admin/inquiries",
      icon: Inbox,
      items: [
        {
          title: "All Inquiries",
          url: "/admin/inquiries",
        },
        {
          title: "Unread",
          url: "/admin/inquiries/unread",
        },
        {
          title: "Archived",
          url: "/admin/inquiries/archived",
        },
      ],
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/admin/settings",
        },
        {
          title: "Store",
          url: "/admin/settings/store",
        },
        {
          title: "Shipping",
          url: "/admin/settings/shipping",
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
            name: user?.fullName || "Admin User",
            email: user?.emailAddresses[0]?.emailAddress || "",
            avatar: user?.imageUrl || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
