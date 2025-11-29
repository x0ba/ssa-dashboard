import "~/styles/globals.css";

import { ThemeProvider } from "~/app/_components/theme-provider";
import { SidebarLayout } from "~/app/_components/sidebar-layout";
import { Toaster } from "~/_components/ui/sonner";
// import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Figtree } from "next/font/google";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "SSA UCSD Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
});

// Inline script to prevent flash of wrong theme
// Sets class AND background color inline before any paint
const themeScript = `
  (function() {
    try {
      var d = document.documentElement;
      var theme = localStorage.getItem('theme');
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var isDark = theme === 'dark' || (!theme && systemDark) || (theme === 'system' && systemDark);
      if (isDark) {
        d.classList.add('dark');
        d.style.colorScheme = 'dark';
        d.style.background = 'oklch(0.145 0 0)';
      } else {
        d.classList.remove('dark');
        d.style.colorScheme = 'light';
        d.style.background = 'oklch(1 0 0)';
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <PostHogProvider>
        <html
          lang="en"
          className={`${figtree.className}`}
          suppressHydrationWarning
        >
          <head>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          </head>
          <body suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarLayout>{children}</SidebarLayout>
              <Toaster position="bottom-left" />
            </ThemeProvider>
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
