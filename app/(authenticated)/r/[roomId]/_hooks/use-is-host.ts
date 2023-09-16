import { usePlayer } from "./use-player";

export const useIsHost = () => {
  const { player } = usePlayer();

  return {
    isHost: player?.role === "host",
  };
};
