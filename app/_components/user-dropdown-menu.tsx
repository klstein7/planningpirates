import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiPaintBrush, HiUser } from "react-icons/hi2";

export const UserDropdownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-primary-foreground bg-background/10"
        >
          <HiUser className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuItem>
          <HiPaintBrush className="mr-2 h-4 w-4" />
          Customize
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
