import "~/styles/globals.css";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/app/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/app-sidebar";
import { ThemeProvider } from "~/app/_components/theme-provider";
// import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Inter } from "next/font/google";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "SSA Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadcn,
      }}
    >
      <PostHogProvider>
        <html
          lang="en"
          className={`${inter.variable}`}
          suppressHydrationWarning
        >
          <body suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 items-center gap-2 px-4 md:hidden">
                    <SidebarTrigger />
                  </header>
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
