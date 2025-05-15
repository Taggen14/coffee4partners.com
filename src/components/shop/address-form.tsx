"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, CreditCard } from "lucide-react";

const addressFormSchema = z.object({
  shipping: z.object({
    firstName: z.string().min(2, "Förnamnet måste vara minst 2 tecken"),
    lastName: z.string().min(2, "Efternamnet måste vara minst 2 tecken"),
    email: z.string().email("Ogiltig e-postadress"),
    phone: z.string().min(10, "Telefonnumret måste vara minst 10 siffror"),
    street: z.string().min(5, "Adressen måste vara minst 5 tecken"),
    postalCode: z.string().min(5, "Postnumret måste vara 5 siffror"),
    city: z.string().min(2, "Staden måste vara minst 2 tecken"),
  }),
  useSameAddress: z.boolean().default(true),
  billing: z
    .object({
      firstName: z.string().min(2, "Förnamnet måste vara minst 2 tecken"),
      lastName: z.string().min(2, "Efternamnet måste vara minst 2 tecken"),
      email: z.string().email("Ogiltig e-postadress"),
      phone: z.string().min(10, "Telefonnumret måste vara minst 10 siffror"),
      street: z.string().min(5, "Adressen måste vara minst 5 tecken"),
      postalCode: z.string().min(5, "Postnumret måste vara 5 siffror"),
      city: z.string().min(2, "Staden måste vara minst 2 tecken"),
    })
    .optional(),
});

type AddressFormData = z.infer<typeof addressFormSchema>;

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => Promise<void>;
  cartTotal: number;
  onPostalCodeChange?: (postalCode: string) => void;
  isCalculatingShipping?: boolean;
  shippingCost: number | null;
  isSubmitting?: boolean;
  submitButtonText?: string;
  submitButtonDescription?: string;
}

export function AddressForm({
  onSubmit,
  // onPostalCodeChange,
  // isCalculatingShipping,
  shippingCost,
  isSubmitting: externalIsSubmitting,
  submitButtonText = "Skicka beställning & faktura",
  submitButtonDescription = "Vi skickar en faktura till din e-postadress som du kan betala inom 14 dagar",
}: AddressFormProps) {
  const [internalIsSubmitting, setInternalIsSubmitting] = useState(false);

  // Use external submission state if provided, otherwise use internal state
  const isSubmitting =
    externalIsSubmitting !== undefined
      ? externalIsSubmitting
      : internalIsSubmitting;

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      useSameAddress: true,
    },
  });

  const useSameAddress = form.watch("useSameAddress");

  // Watch for changes in useSameAddress and reset billing fields when toggling back to true
  useEffect(() => {
    if (useSameAddress) {
      form.setValue("billing", undefined);
    }
  }, [useSameAddress, form]);

  const handleSubmit = async (data: AddressFormData) => {
    if (!shippingCost) {
      toast.error("Please wait while we calculate shipping cost");
      return;
    }

    // If using same address, copy shipping address to billing
    const finalData = {
      ...data,
      billing: data.useSameAddress ? data.shipping : data.billing!,
      shippingCost: shippingCost,
    };

    // Only manage submission state internally if it's not controlled externally
    if (externalIsSubmitting === undefined) {
      setInternalIsSubmitting(true);
    }

    try {
      await onSubmit(finalData);
    } finally {
      // Only manage submission state internally if it's not controlled externally
      if (externalIsSubmitting === undefined) {
        setInternalIsSubmitting(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Leveransadress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shipping.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Förnamn</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipping.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Efternamn</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="shipping.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-post</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipping.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipping.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adress</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="shipping.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postnummer</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // if (e.target.value.length === 5) {
                          //   onPostalCodeChange(e.target.value);
                          // }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shipping.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stad</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Faktureringsadress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="useSameAddress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Använd samma adress för fakturering</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {!useSameAddress && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billing.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Förnamn</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="billing.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Efternamn</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="billing.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-post</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billing.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billing.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adress</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="billing.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postnummer</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="billing.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stad</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
        // disabled={isCalculatingShipping || !shippingCost || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Skapar order...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              {submitButtonText}
            </>
          )}
        </Button>
        {submitButtonDescription && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {submitButtonDescription}
          </p>
        )}
      </form>
    </Form>
  );
}
