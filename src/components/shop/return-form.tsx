"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Prisma } from "@prisma/client";

const returnFormSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  description: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
      reason: z.string().optional(),
    }),
  ),
});

export type ReturnFormValues = z.infer<typeof returnFormSchema>;

interface ReturnFormProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderItems: true;
    };
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReturnFormValues) => Promise<void>;
}

export function ReturnForm({
  order,
  open,
  onOpenChange,
  onSubmit,
}: ReturnFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      reason: "",
      description: "",
      items: order.orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        reason: "",
      })),
    },
  });

  const handleSubmit = async (data: ReturnFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      onOpenChange(false);
      toast.success("Return request submitted successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit return request",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Return</DialogTitle>
          <DialogDescription>
            Please provide details about your return request.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Reason</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Why are you returning?" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Provide any additional information..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Return Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
