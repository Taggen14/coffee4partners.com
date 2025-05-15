"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email("Ange en giltig e-postadress"),
})


export default function InviteNewAdmin() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      const response = await fetch("/api/invitations/new-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })

      if (!response.ok) {
        const json = await response.json()
        throw new Error(json.error || "Något gick fel")
      }

      toast.success("Inbjudan skickad!")
      form.reset()
    } catch (error) {
      toast.error("Något gick fel vid inbjudan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Bjud in ny Admin</h2>
      <div className="text-sm">
        <p>Fyll i fältet nedan och klicka på "skicka inbjudan" så skickas en länk till angiven epost för att skapa ett admin login. Den inbjudna får skapa lösenord och är sedan inloggad.</p>
        <p>En admin kommer få full åtkomst till att skapa och ändra produkter i webbshoppen samt hantera ordrar</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-sm">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="py-2">E-postadress</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="exempel@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className=""
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                Skickar...
              </div>
            ) : (
              "Skicka inbjudan"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
