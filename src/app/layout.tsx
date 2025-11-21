import { ClerkProvider, UserButton } from "@clerk/nextjs";
import "~/styles/globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/_components/ui/sidebar";
import { AppSidebar } from "~/_components/app-sidebar";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "SSA Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
