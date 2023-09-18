import { api } from "@/lib/server/actions";
import { PusherEventListener } from "./_pusher/pusher-event-listener";

export default async function RoomLayout({
  children,
  params: { roomId },
}: {
  children: React.ReactNode;
  params: {
    roomId: string;
  };
}) {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-3">
        {children}
      </div>
      <PusherEventListener roomId={roomId} />
    </>
  );
}
