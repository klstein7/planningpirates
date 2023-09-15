import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { api } from "@/lib/trpc/api";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  await api.profiles.sync.mutate();

  return <div className="flex flex-1 flex-col">{children}</div>;
}
