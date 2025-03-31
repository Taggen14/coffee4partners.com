import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, "Förnamn är obligatoriskt och måste innehålla minst 2 tecken"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().refine((value) => /^[0-9]+$/.test(value), {
    message: "Telefonnummer är obligatoriskt och får bara innehålla siffror",
  }),
  message: z.string().min(1, "Meddelande är obligatoriskt"),
});
