import type { User } from "@clerk/nextjs/server";
import {
  Music,
  User as UserIcon,
  GraduationCap,
  BookOpenText,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "~/_components/ui/card";

export function UserInfoSection({ user }: { user: User | null }) {
  const userInstrument = user?.publicMetadata.instrument as string | undefined;
  const userMajor = user?.publicMetadata.major as string | undefined;
  const userGraduationYear = user?.publicMetadata.graduationYear as
    | string
    | undefined;
  const userEmailAddresses = user?.emailAddresses;

  return (
    <Card className="gap-2 sm:col-span-1 lg:col-span-1">
      <CardHeader>
        <span className="text-2xl font-bold">User Info</span>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-3">
          <UserIcon className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">{user?.fullName}</span>
            <span className="text-muted-foreground text-sm">
              {userEmailAddresses?.[0]?.emailAddress ?? "No Email"}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <Music className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
          <span className="font-semibold">{userInstrument}</span>
        </div>
        <div className="flex flex-row items-center gap-3">
          <BookOpenText className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{userMajor}</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
          <GraduationCap className="h-10 w-10 rounded-lg bg-blue-100 p-2 text-blue-800" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Class of {userGraduationYear}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
