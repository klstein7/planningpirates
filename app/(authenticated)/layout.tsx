import { auth } from "@clerk/nextjs";
import { BackgroundImage } from "../_components/background-image";
import { ProfileProvider } from "./_context/profile-provider";
import { api } from "@/lib/server/actions";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  const profile = await api.profiles.get({ id: userId as string });

  return (
    <BackgroundImage>
      <ProfileProvider profile={profile}>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
      </ProfileProvider>
    </BackgroundImage>
  );
}
