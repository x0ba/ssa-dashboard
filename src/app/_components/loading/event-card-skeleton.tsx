import { Card, CardHeader, CardDescription, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden p-0">
      <div className="flex flex-col p-6">
        <CardHeader className="p-0">
          <CardTitle>
            <Skeleton className="h-6 w-3/4" />
          </CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-28" />
            </div>
          </CardDescription>
        </CardHeader>
      </div>
      <div className="relative h-64 w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
    </Card>
  );
}
