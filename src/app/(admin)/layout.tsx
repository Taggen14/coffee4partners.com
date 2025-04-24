import { AppSidebar } from "@/components/admin/app-sidebar";
import { PageContainer } from "@/components/admin/page-container";
import { SidebarBreadcrumbs } from "@/components/admin/sidebar-breadcrumbs";
import { SidebarHeader } from "@/components/admin/sidebar-header";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
