import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();

  const url = headersList.get("x-url") || "";

  console.log({ url });

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/sign-in?callbackUrl=${url}`);
  }

  return <div className="flex flex-1 flex-col">{children}</div>;
}
