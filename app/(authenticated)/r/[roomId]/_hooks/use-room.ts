import { trpc } from "@/lib/trpc/client";
import { useRoomId } from "./use-room-id";

export const useRoom = () => {
  const { roomId } = useRoomId();

  return trpc.rooms.get.useQuery({ id: roomId });
};
