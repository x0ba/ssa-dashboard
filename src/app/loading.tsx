import { Loader2 } from "~/_components/icons";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "SSA Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <Loader2 className="text-primary h-10 w-10 animate-spin" />
    </div>
  );
}
