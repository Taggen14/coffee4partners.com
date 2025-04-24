"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
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
import content from "@/app/sv.json";
import { Textarea } from "../ui/textarea";
import { Check, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema } from "@/formSchema/contact-form-schema";

interface FormTemplateProps {
  subject: string;
}

const FormTemplate = ({ subject }: FormTemplateProps) => {
  const { fields, submitButton } = content.components.form;
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log({ ...values, subject: subject });
    try {
      setIsLoading(true);
      const response = await fetch("/api/email/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Något gick fel");
      }
      setIsLoading(false);
      toast("Ditt meddelande har skickats!");
      setIsSent(true);
      setTimeout(() => {
        form.reset();
        setIsSent(false);
      }, 5000);
    } catch (error) {
      console.error("Error:", error);
      toast(
        "Något gick fel ditt meddelande har inte skickats, kontakta oss gärna via telefon istället!",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((fieldData, i) => (
          <div key={i}>
            {fieldData.type === "textarea" ? (
              <FormField
                control={form.control}
                name={fieldData.name as Path<z.infer<typeof contactFormSchema>>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldData.label}</FormLabel>
                    <FormControl>
                      <Textarea className="h-32" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name={fieldData.name as Path<z.infer<typeof contactFormSchema>>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldData.label}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        ))}
        {!isSent ? (
          <Button variant={"default"} type="submit" className="flex gap-1">
            {isLoading && (
              <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
            )}
            {submitButton.send}
          </Button>
        ) : (
          <Button
            variant={"default"}
            type="submit"
            className="flex gap-1 bg-ring"
          >
            <Check />
            {submitButton.sent}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FormTemplate;
