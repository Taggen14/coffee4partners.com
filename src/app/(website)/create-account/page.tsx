"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useInvites } from "@/hooks/use-invites";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const roleSchema = z.object({
  companyName: z.string().min(1, "Du behöver ange ditt företagsnamn"),
  email: z.string().email("Måste vara en giltig e-post!"),
});

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const { createUserInvite } = useInvites();

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      companyName: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof roleSchema>) {
    try {
      setLoading(true);
      await createUserInvite.mutateAsync({
        emailAddress: data.email,
        id: "",
        status: "pending",
        publicMetadata: {
          notificationSent: false,
          companyName: data.companyName,
          role: "customer",
          pricing: 1,
        },
      });
      await fetch("/api/email/create-account-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success("Din förfrågan om att skapa konto har skickats", {
        duration: 3000,
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Något gick fel med att skapa konto", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-5 bg-white justify-center px-8 py-10 shadow-lg rounded-lg border border-gray-200 w-full max-w-sm">
        <h1 className="text-2xl font-semibold p-0">Bli kund</h1>
        <Image
          src="/logo.png"
          alt="Coffee4partners logotyp"
          width={270}
          height={33}
          priority
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Företags namn*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" className="w-full">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span>Nästa</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
