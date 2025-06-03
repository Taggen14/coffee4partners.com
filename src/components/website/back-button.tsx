"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function BackButton() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      {!isLoaded ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        !isSignedIn && (
          <Button
            variant="default"
            size="icon"
            onClick={() => router.back()}
            className="w-fit p-4 space-x-1"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Tillbaka</span>
          </Button>
        )
      )}
    </>
  );
}
