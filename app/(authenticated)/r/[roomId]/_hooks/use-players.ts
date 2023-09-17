import { useContext } from "react";
import { PlayersContext } from "../_context/players-context";

export const usePlayers = () => {
  const players = useContext(PlayersContext);

  return {
    players,
  };
};
