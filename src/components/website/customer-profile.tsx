import SignOutButton from "@/components/website/sign-out-button";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const ProfilDropdown = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlineNavIcons" size="icon" aria-label="Öppna användarmeny">
          <User style={{ width: 24, height: 24 }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        className={cn("", !isSignedIn ? "hidden" : "block")}
      >
        {isLoaded && isSignedIn ? (
          <div className="flex flex-col items-end p-2">
            {user.fullName && (
              <>
                <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <p className="px-2">
              {capitalizeFirstLetter(user?.emailAddresses[0].emailAddress)}
            </p>
            <DropdownMenuSeparator />
            <div className="flex justify-between w-full gap-5">
              {user?.publicMetadata?.role === "admin" && (
                <DropdownMenuItem className="p-0 m-0">
                  <Button
                    className="border border-secondary-foreground"
                    variant={"outlineNavIcons"}
                    onClick={() => redirect("/admin")}
                  >
                    admin
                  </Button>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="p-0 m-0">
                <SignOutButton variant={"secondaryInverted"} />
              </DropdownMenuItem>
            </div>
          </div>
        ) : (
          <RedirectToSignIn />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfilDropdown;
