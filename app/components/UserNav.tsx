import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorClosed, Search, MapPinned, Users, List, Coins, Plane, Globe } from "lucide-react";
import Link from "next/link";

export const navItems = [
  { name: "Searches", href: "/dashboard/", icon: Search },
  { name: "Explore", href: "/dashboard/search", icon: Globe },
  { name: "Saved", href: "/dashboard/saved", icon: MapPinned },
  { name: "Tips", href: "/dashboard/connections", icon: Users },
];

export function UserNav({
  name,
  email,
  image,
  onSignOut,
}: {
  name: string;
  email: string;
  image: string;
  onSignOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 rounded-full border border-light">
            <AvatarImage src={image} alt="" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 bg-white p-4 border-radius" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className="w-full flex justify-between items-center cursor-pointer nav-item"
              >
                {item.name}
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="w-full flex justify-between items-center cursor-pointer red"
          onClick={onSignOut}
        >
          Logout{" "}
          <span>
            <DoorClosed className="w-4 h-4" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
