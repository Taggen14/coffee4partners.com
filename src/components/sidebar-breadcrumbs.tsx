"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { capitalize } from "@/lib/utils";

export function SidebarBreadcrumbs() {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((name) => name);

  // If we're at the root path, don't show breadcrumbs
  if (pathname === "/") {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((name, index) => {
          const href = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isCurrentPage = index === pathnames.length - 1;
          const displayName = name.replace(/-/g, " ");

          return (
            <div key={href + index} className="inline-flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isCurrentPage ? (
                  <BreadcrumbPage>{capitalize(displayName)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {capitalize(displayName)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
