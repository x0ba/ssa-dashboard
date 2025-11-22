import { Card, CardHeader, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function LinkCardSkeleton() {
  return (
    <Card className="w-full max-w-[320px] py-0">
      <CardHeader className="flex flex-col gap-2 p-4">
        <div className="flex flex-row items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="flex flex-1 flex-col gap-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
        </div>
        <CardDescription className="text-muted-foreground mt-2 text-sm">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
