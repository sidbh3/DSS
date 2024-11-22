import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { FaComputer } from "react-icons/fa6";

const Header = () => {
  const { user, role } = useAuth();
  const { setTheme, theme } = useTheme();

  return (
    <div className="w-full h-16 flex items-center justify-between px-6 dark:border-b bg-white dark:bg-background dark:text-white shadow-md">
      <div className="w-full">
        <div className="flex flex-col text-secondary-foreground">
          <p className="text-sm">Welcome</p>
          <div className="flex items-end gap-2">
            <h1 className="font-bold text-xl">{user?.name || "Username,"}</h1>
            <p className="text-sm">Designation</p>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end gap-5">
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-secondary-foreground bg-gray-200 dark:bg-gray-800 outline-none ring-offset-0 focus-visible:outline-none focus-visible:ring-0 flex items-center gap-2 h-[44px]"
            >
              {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : theme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <FaComputer className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="cursor-pointer border-b"
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="cursor-pointer border-b"
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="cursor-pointer"
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-secondary-foreground">Eastern</p>
          <p className="text-sm text-secondary-foreground">Air-Command</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
