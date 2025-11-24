// app/providers.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load PostHog to reduce initial bundle size
const PostHogProviderClient = dynamic(
  () =>
    import("./provider-client").then((mod) => ({
      default: mod.PostHogProviderClient,
    })),
  { ssr: false },
);

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <PostHogProviderClient>{children}</PostHogProviderClient>;
}
