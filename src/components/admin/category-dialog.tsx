"use client";

import { useEffect, useState } from "react";
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
import { Loader2, Trash2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useCategoriesTypes } from "@/types";
import { useCategories } from "@/hooks/use-categories";

const categoryFormSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  description: z.string().optional(),
  images: z.array(z.string()),
});

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: useCategoriesTypes | null;
}

export function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const { createCategory, updateCategory, deleteCategory } = useCategories();

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        images: category.images || [],
      });
    } else {
      form.reset({
        name: "",
        description: "",
        images: [],
      });
    }
  }, [category]);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
    },
  });

  async function handleDeleteCategory(category: useCategoriesTypes) {
    try {
      if (category.subCategories.length) {
        toast.error(
          `"${category.name}" går inte att tabort. För att "${category.name}" har ${category.subCategories.length} underkategorier. Navigera till underkategorier och tabort dem först!`,
        );
        return;
      }
      if (category._count.products) {
        toast.error(
          `"${category.name}" går inte att tabort. För att "${category.name}" har ${category._count.products} produkter. Navigera till produkter och tabort dem först!`,
        );
        return;
      }
      await deleteCategory.mutateAsync(category.id);
      toast.success(`${category.name} raderades`);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Misslyckade att radera ${category.name}`);
    }
  }

  async function onSubmit(data: z.infer<typeof categoryFormSchema>) {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        name: capitalizeFirstLetter(data.name),
        description: capitalizeFirstLetter(data.description),
      };
      if (category) {
        await updateCategory.mutateAsync({
          categoryId: category.id,
          data: finalData,
        });
      } else {
        await createCategory.mutateAsync(finalData);
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(
        `Misslyckades att ${category ? "uppdatera" : "skapa"} kategori`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">
            {category ? "Uppdatera" : "Ny"} Kategori
          </DialogTitle>
          <DialogDescription className="text-base">
            {category
              ? "Uppdatera de fält du önskar"
              : "Lägg till en ny kategori. Fyll i alla obligatoriska fält nedan."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(70dvh-32px)] pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="create-product-form"
              className="space-y-6 px-1"
            >
              <div className="grid gap-6">
                {/* name */}
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Kategorinamn*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ange kategoriens namn"
                          className="h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* description */}
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Beskrivning</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Beskriv kategorin"
                          className="min-h-[120px] text-base resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* images */}
                <FormField
                  name="images"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Kategoribild</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          disabled={loading}
                          onChange={(urls) => field.onChange(urls)}
                          onRemove={(url) =>
                            field.onChange(
                              field.value?.filter((current) => current !== url),
                            )
                          }
                          maxFiles={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>

        <DialogFooter className="pt-4">
          <div className="flex justify-between w-full">
            {category && (
              <Button
                className="h-11 px-8 text-base flex gap-1"
                variant={"destructive"}
                onClick={() => handleDeleteCategory(category)}
              >
                <Trash2 />
                Radera
              </Button>
            )}
            {/* onSubmit */}
            <Button
              type="submit"
              form="create-product-form"
              disabled={loading}
              className="h-11 px-8 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {category ? "Uppdaterar" : "Skapar"} kategori...
                </>
              ) : (
                <>{category ? "Uppdaterar" : "Skapar"} kategori</>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
