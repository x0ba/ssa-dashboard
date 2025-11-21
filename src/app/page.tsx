import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return <main className="p-4">Dashboard in progress</main>;
}
