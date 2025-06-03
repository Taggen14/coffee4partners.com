"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

type Variant =
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "outlineNavIcons"
  | "secondary"
  | "secondaryInverted"
  | "ghost"
  | null
  | undefined;

type SignOutButtonProps = {
  variant?: Variant;
};

const SignOutButton = ({ variant = "default" }: SignOutButtonProps) => {
  const { signOut } = useAuth();
  return (
    <Button
      variant={variant}
      className="space-x-1"
      onClick={() => {
        signOut();
        toast("Du har loggats ut!");
      }}
    >
      <LogOut />
      <span>Logga ut</span>
    </Button>
  );
};

export default SignOutButton;
