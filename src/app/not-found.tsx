import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/app/_components/ui/card";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
            <FileQuestion className="h-6 w-6 text-orange-600 dark:text-orange-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription className="text-balance pt-2">
            The page you are looking for does not exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/">Go back home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

