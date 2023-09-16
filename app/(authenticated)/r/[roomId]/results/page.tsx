import { Separator } from "@/components/ui/separator";
import { SelectedValueList } from "./_components/selected-value-list";

export default function ResultsPage({
  params: { roomId },
}: {
  params: {
    roomId: string;
  };
}) {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="bg-background flex w-full max-w-2xl flex-col items-center gap-3 rounded p-6">
        <h1 className="text-3xl font-bold">Crew&apos;s Outcome</h1>
        <Separator />
        <SelectedValueList />
      </div>
    </div>
  );
}
