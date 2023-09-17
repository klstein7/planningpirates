import { useContext } from "react";
import { RoomContext } from "../_context/room-context";

export const useRoom = () => {
  const room = useContext(RoomContext);

  return {
    room,
  };
};
