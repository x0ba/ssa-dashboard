"use client";

import { usePathname } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/app-sidebar";
import { useUser } from "@clerk/nextjs";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  if (pathname?.startsWith("/onboarding")) {
    return <>{children}</>;
  }

  const isAdmin = isLoaded && user?.publicMetadata?.role === "admin";

  return (
    <SidebarProvider>
      <AppSidebar pathname={pathname} isAdmin={isAdmin} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 md:hidden">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
