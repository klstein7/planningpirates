import { useParams } from "next/navigation";

export const useRoom = () => {
  const params = useParams();

  const roomId = params.roomId as string;

  return {
    roomId,
  };
};
