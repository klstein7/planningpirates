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
        <button className="bg-background/10 text-primary-foreground hover:bg-background/20 flex items-center justify-center rounded-md p-2 transition-all duration-100 focus-within:outline-none">
          <HiUser className="h-5 w-5" />
        </button>
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
