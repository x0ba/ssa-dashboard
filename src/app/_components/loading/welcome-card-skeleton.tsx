import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function WelcomeCardSkeleton() {
  return (
    <Card className="from-primary/10 via-primary/5 to-background border-primary/20 bg-linear-to-r">
      <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-64" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
