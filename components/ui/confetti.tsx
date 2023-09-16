"use client";

import { useWindowSize } from "usehooks-ts";
import { default as ReactConfetti } from "react-confetti";

export const Confetti = () => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      width={width}
      height={height}
      gravity={0.03}
      numberOfPieces={100}
    />
  );
};
