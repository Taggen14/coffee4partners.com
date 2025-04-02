import { z } from "zod";

export const newsletterForm = z.object({
  email: z.string().email("Ogiltig e-postadress måste innehålla @"),
});
