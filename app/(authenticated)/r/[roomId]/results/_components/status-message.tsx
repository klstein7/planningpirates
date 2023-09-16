"use client";

import Image from "next/image";
import { useRoom } from "../../_hooks/use-room";
import { TriangleLeftIcon, TriangleRightIcon } from "@radix-ui/react-icons";

export const StatusMessage = () => {
  const room = useRoom();

  return (
    <div className="flex items-center">
      <Image
        src="/images/captain.png"
        width={150}
        height={150}
        alt="captain avatar"
      />
      <TriangleLeftIcon className="text-secondary -mr-3.5 h-8 w-8" />
      <div className="flex-1">
        <div className="bg-secondary flex rounded-md p-3 text-sm">
          {room.data?.statusMessage}
        </div>
      </div>
    </div>
  );
};
