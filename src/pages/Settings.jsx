import React from "react";
import { Moon, Sun, Bell, Shield, Eye, Globe, Lock } from "lucide-react";
import { FaComputer } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Switch } from "../components/ui/Switch";
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
    <div className="w-full bg-background rounded-md">
      <h1 className="text-2xl font-bold text-secondary-foreground mb-6 tracking-widest">
        Settings
      </h1>

      <div className="space-y-8">
        {/* Appearance Section */}
        <SettingsSection title="Appearance">
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
                  className="border-secondary-foreground text-secondary-foreground"
                >
                  <span className="mr-2">Toggle theme</span>
                  {theme === "light" ? (
                    <Sun className="h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <FaComputer className="h-4 w-4" />
                  )}
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
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection title="Security">
          <SettingsRow
            icon={<Shield className="h-5 w-5" />}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            control={<Switch />}
          />
          <SettingsRow
            icon={<Lock className="h-5 w-5" />}
            title="Automatic Logout"
            description="Automatically logout after 30 minutes of inactivity"
            control={<Switch />}
          />
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection title="Notifications">
          <SettingsRow
            icon={<Bell className="h-5 w-5" />}
            title="Alert Notifications"
            description="Receive notifications for critical updates"
            control={<Switch />}
          />
        </SettingsSection>

        {/* Display Settings */}
        <SettingsSection title="Display Settings">
          <SettingsRow
            icon={<Eye className="h-5 w-5" />}
            title="High Contrast Mode"
            description="Increase contrast for better visibility"
            control={<Switch />}
          />
          <SettingsRow
            icon={<Globe className="h-5 w-5" />}
            title="Language"
            description="Select your preferred language"
            control={
              <select className="border rounded p-1 text-primary">
                <option className="text-primary">English</option>
                <option className="text-primary">Hindi</option>
              </select>
            }
          />
        </SettingsSection>
      </div>
    </div>
  );
}

const SettingsSection = ({ title, children }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
    <h2 className="text-lg font-semibold mb-4 text-secondary-foreground">
      {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const SettingsRow = ({ icon, title, description, control }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-3">
      <div className="text-secondary-foreground">{icon}</div>
      <div>
        <div className="font-medium text-secondary-foreground">{title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
    {control}
  </div>
);

export default Settings;
