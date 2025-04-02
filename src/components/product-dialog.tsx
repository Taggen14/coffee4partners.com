"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";
import { CategoryCombobox } from "@/components/ui/category-combobox";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

const productFormSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  description: z.string().min(1, "Beskrivning krävs"),
  price: z.coerce
    .number()
    .min(0, "Priset måste vara större än 0")
    .transform((val) => Number(val.toFixed(2))),
  categoryId: z.string().min(1, "Kategori krävs"),
  stock: z.coerce
    .number()
    .int()
    .min(0, "Lager måste vara större än eller lika med 0"),
  images: z.array(z.string()).min(1, "Minst en bild krävs"),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProducts();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      stock: 0,
      images: [],
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setLoading(true);
    try {
      await createProduct.mutateAsync(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">Ny produkt</DialogTitle>
          <DialogDescription className="text-base">
            Lägg till en ny produkt i din butik. Fyll i alla obligatoriska fält
            nedan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Produktnamn</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ange produktens namn"
                        className="h-11 text-base"
                        {...field}
                      />
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
                    <FormLabel className="text-base">Beskrivning</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Beskriv produkten"
                        className="min-h-[120px] text-base resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Pris</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            kr
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            className="h-11 pl-12 text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Lager</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Kategori</FormLabel>
                    <FormControl>
                      <CategoryCombobox
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Produktbilder</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || []}
                        disabled={loading}
                        onChange={(urls) => field.onChange(urls)}
                        onRemove={(url) =>
                          field.onChange(
                            field.value?.filter((current) => current !== url),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="h-11 px-8 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Skapar produkt...
                  </>
                ) : (
                  "Skapa produkt"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
