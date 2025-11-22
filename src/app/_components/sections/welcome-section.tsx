import { Card, CardContent } from "~/app/_components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { Music } from "lucide-react";

export async function WelcomeSection() {
  const user = await currentUser();
  const userName = user?.fullName;
  const currentDate = new Date().toLocaleDateString();

  return (
    <Card className="from-primary/10 via-primary/5 to-background border-primary/20 mt-4 bg-linear-to-r">
      <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-10">
        <div className="space-y-2">
          <h2 className="text-primary flex items-center gap-2.5 text-3xl font-bold tracking-tight sm:text-4xl">
            <Music width={36} height={36} /> Welcome to SSA,{" "}
            {userName?.substring(0, userName.indexOf(" ")) ?? " "}
            {"."}
          </h2>
          <p className="text-muted-foreground text-lg font-medium">
            {currentDate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

