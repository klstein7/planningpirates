import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { cn } from "@/lib/utils";
import { BackgroundImage } from "../_components/background-image";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();

  const url = headersList.get("x-url") || "";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/sign-in?callbackUrl=${url}`);
  }

  return (
    <BackgroundImage>
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </BackgroundImage>
  );
}
