import { UserDropdownMenu } from "../../_components/user-dropdown-menu";
import { PusherEventListener } from "./_pusher/pusher-event-listener";

export default function RoomLayout({
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
      <div className="flex h-full w-full bg-[url('/images/floor.png')] bg-center">
        <div className="flex h-full w-full flex-col items-center gap-3 backdrop-blur-sm">
          <div className="flex w-full justify-end p-3">
            <UserDropdownMenu />
          </div>
          {children}
        </div>
      </div>
      <PusherEventListener roomId={roomId} />
    </>
  );
}
