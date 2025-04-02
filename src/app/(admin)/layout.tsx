import { AppSidebar } from "@/components/app-sidebar";
import { PageContainer } from "@/components/page-container";
import { SidebarBreadcrumbs } from "@/components/sidebar-breadcrumbs";
import { SidebarHeader } from "@/components/sidebar-header";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SidebarHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SidebarBreadcrumbs />
          </SidebarHeader>
          <PageContainer>{children}</PageContainer>
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </ClerkProvider>
  );
}
