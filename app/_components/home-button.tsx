"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { HiHome } from "react-icons/hi2";

export const HomeButton = () => {
  const router = useRouter();
  const params = useParams();

  const isInRoom = !!params.roomId;

  if (!isInRoom) {
    return null;
  }

  return (
    <Button
      type="submit"
      size="icon"
      variant="ghost"
      className="text-primary-foreground"
      onClick={() => {
        router.push("/");
      }}
    >
      <HiHome className="h-5 w-5" />
    </Button>
  );
};
