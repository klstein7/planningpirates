import { getBackgroundColor, getTextColor } from "@/app/_util/colors";
import { RouterOutput } from "@/lib/trpc/utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const PlayerItem = ({
  player,
}: {
  player: RouterOutput["players"]["find"][number];
}) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={cn(
        "flex w-24 flex-col items-center gap-3 rounded-sm bg-opacity-20 p-3",
        getBackgroundColor(player.profile.color)
      )}
    >
      <div
        className={cn(
          "border-border/20 flex h-16 w-10 items-center justify-center rounded border",
          player.selectedValue !== null &&
            getBackgroundColor(player.profile.color)
        )}
      />
      <Image
        src={player.profile.avatarUrl}
        width={96}
        height={96}
        alt="user avatar"
      />
      <div
        className={cn(
          "truncate text-xs font-medium",
          getTextColor(player.profile.color)
        )}
      >
        {player.profile.name}
      </div>
    </div>
  );
};
