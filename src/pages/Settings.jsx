import React from "react";
import { Moon, Sun } from "lucide-react";
import { FaComputer } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";

function Settings() {
  const { setTheme, theme } = useTheme();
  return (
    <div className="w-full h-[80vh] bg-background rounded-md">
      <div className="h-full w-full">
        <div className="w-full h-full">
          <h1 className="text-2xl font-bold text-secondary-foreground mb-6 tracking-widest">
            Settings
          </h1>
          <div className="space-y-8 flex flex-col justify-between w-full h-[65vh]">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {theme === "light" ? (
                    <Sun className="text-2xl text-secondary-foreground" />
                  ) : theme === "dark" ? (
                    <Moon className="text-2xl text-secondary-foreground" />
                  ) : (
                    <FaComputer className="text-2xl text-secondary-foreground" />
                  )}
                  <span className="text-sm font-medium text-secondary-foreground">
                    {theme === "light"
                      ? "Light Theme"
                      : theme === "dark"
                      ? "Dark Theme"
                      : "System Default Theme"}
                  </span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-secondary-foreground text-secondary-foreground outline-none ring-offset-0 focus-visible:outline-none focus-visible:ring-0 flex items-center gap-2"
                    >
                      {theme === "light" ? (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                      ) : theme === "dark" ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                      ) : (
                        <FaComputer className="h-[1.2rem] w-[1.2rem]" />
                      )}
                      <span className="">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System Default
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
