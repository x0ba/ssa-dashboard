import Link from "next/link";
import { db } from "~/server/db";
import { Card, CardContent } from "~/_components/ui/card";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await currentUser();
  const userName = user?.fullName;
  const currentDate = new Date().toLocaleDateString();

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Overview</h1>
      <Card className="from-primary/10 via-primary/5 to-background border-primary/20 mt-4 bg-linear-to-r">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-10">
          <div className="space-y-2">
            <h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome to SSA,{" "}
              {userName?.substring(0, userName.indexOf(" ")) ?? " "}
            </h2>
            <p className="text-muted-foreground text-lg font-medium">
              {currentDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
