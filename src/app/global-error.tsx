"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { Button } from "~/app/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "~/app/_components/ui/card";
import { AlertCircle } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="bg-muted/30 flex min-h-screen flex-col items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Something went wrong!
              </CardTitle>
              <CardDescription className="text-balance pt-2">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </CardDescription>
            </CardHeader>
            {error.digest && (
              <CardContent className="text-center">
                <p className="text-muted-foreground text-xs">
                  Error ID: <span className="font-mono">{error.digest}</span>
                </p>
              </CardContent>
            )}
            <CardFooter className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="default"
                className="w-full sm:w-1/2"
                onClick={() => reset()}
              >
                Try again
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-1/2"
                onClick={() => (window.location.href = "/")}
              >
                Go back home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
