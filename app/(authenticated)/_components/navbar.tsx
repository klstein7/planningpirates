import { api } from "@/lib/server/actions";
import { UserDropdownMenu } from "./user-dropdown-menu";
import { HomeButton } from "./home-button";

export const Navbar = async () => {
  const profile = await api.profiles.get();

  return (
    <div className="flex items-center justify-end gap-3 p-3">
      <HomeButton />
      <UserDropdownMenu profile={profile} />
    </div>
  );
};
