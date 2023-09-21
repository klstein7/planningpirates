"use client";

import { Button } from "@/components/ui/button";
import { useRoomId } from "../_hooks/use-room-id";
import { PiCheck, PiCheckDuotone, PiCopySimpleDuotone } from "react-icons/pi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";

export const ShareRoomIdButton = () => {
  const [copied, setCopied] = useState(false);
  const [_, copy] = useCopyToClipboard();
  const { toast } = useToast();

  const { roomId } = useRoomId();
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className="h-auto border bg-black/5 text-2xl font-bold backdrop-blur-md"
            onClick={() => {
              copy(roomId);
              toast({
                title: "Ye've seized the room code!",
                description: "Now ye can share it with yer mates!",
                duration: 4000,
                className: "border border-black/20",
              });
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? (
              <PiCheck className="animate-in fade-in mr-2 h-6 w-6 duration-200" />
            ) : (
              <PiCopySimpleDuotone className="animte-out fade-out animate-in fade-in mr-2 h-6 w-6 duration-200" />
            )}
            {roomId}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">Click to snag your room code, arr!</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
