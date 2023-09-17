"use client";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export const BackgroundImage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = useParams();

  const backgroundImage = useMemo(() => {
    const isInRoom = params.roomId;

    return isInRoom
      ? "bg-[url('/images/floor.png')]"
      : "bg-[url('/images/bg.png')]";
  }, [params]);

  return (
    <div className={cn("flex h-full w-full bg-center", backgroundImage)}>
      <div className="flex h-full w-full backdrop-blur-[8px]">{children}</div>
    </div>
  );
};
