import { useParams } from "next/navigation";

export const useRoomId = () => {
  const params = useParams();

  const roomId = params.roomId as string;

  return {
    roomId,
  };
};
