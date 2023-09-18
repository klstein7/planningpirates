import { getBackgroundColor, getTextColor } from "@/app/_util/colors";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useIsHost } from "../_hooks/use-is-host";
import { PiCrownSimpleFill } from "react-icons/pi";
import { API } from "@/lib/server/actions";

export const PlayerItem = ({
  player,
}: {
  player: API["players"]["find"][number];
}) => {
  return (
    <div className="border-border/20 flex w-20 flex-col items-center gap-3 rounded-sm border bg-black/20 p-3 backdrop-blur-md md:w-24">
      <div
        className={cn(
          "border-border/20 flex h-12 w-8 items-center justify-center rounded border md:h-16 md:w-10",
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
          "flex w-12 items-center justify-center gap-1 text-xs font-medium",
          getTextColor(player.profile.color)
        )}
      >
        {player.role === "host" && <PiCrownSimpleFill className="h-3 w-3" />}
        <span className="truncate">{player.profile.name}</span>
      </div>
    </div>
  );
};
