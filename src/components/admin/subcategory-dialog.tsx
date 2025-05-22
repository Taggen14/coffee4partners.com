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
import { SubCategory } from "@prisma/client";
import { useSubCategories } from "@/hooks/use-sub-categories";
import { CategoryCombobox } from "./category-combobox";

const subCategoryFormSchema = z.object({
  name: z.string().min(1, "Namn är obligatoriskt"),
  description: z.string().optional(),
  images: z.array(z.string()),
  categoryId: z.string().min(1, "du behöver välja vilken kategori din underkategori ska tillhöra"),
});

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: SubCategory & { _count: { products: number } } | null;
}

export function SubCategoryDialog({ open, onOpenChange, category }: CategoryDialogProps) {
  const [loading, setLoading] = useState(false);
  const { deleteSubCategory, updateSubCategory, createSubCategory, subCategories } = useSubCategories()

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        images: category.images || [],
        categoryId: category.id,
      });
    } else {
      form.reset();
    }
  }, [category]);

  const form = useForm<z.infer<typeof subCategoryFormSchema>>({
    resolver: zodResolver(subCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      categoryId: "",
    },
  });

  async function handleDeleteCategory(category: SubCategory & { _count: { products: number } }) {
    try {
      if (category._count.products) {
        toast.error(`"${category.name}" går inte att tabort. För att "${category.name}" har ${category._count.products} produkter. Navigera till produkter och tabort dem först!`);
        return
      }
      await deleteSubCategory.mutateAsync(category.id)
      toast.success(`${category.name} raderades`);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Misslyckade att radera ${category.name}`);
    }
  }

  async function onSubmit(data: z.infer<typeof subCategoryFormSchema>) {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        name: capitalizeFirstLetter(data.name),
        description: capitalizeFirstLetter(data.description),
      };
      if (category) {
        await updateSubCategory.mutateAsync({ categoryId: category.id, data: finalData });
      } else {
        console.log('finalData ', finalData)
        const existingSubCategory = subCategories?.find((c) => c.name === finalData.name);
        if (existingSubCategory) {
          toast.error(`underkategorien "${data.name}" finns redan, en underkategori måste ha en unikt namn`);
          return
        }
        await createSubCategory.mutateAsync(finalData);
      }
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error(`Misslyckades att ${category ? "uppdatera" : "skapa"} kategori`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">{category ? "Uppdatera" : "Ny"} Underkategori</DialogTitle>
          <DialogDescription className="text-base">
            {category ? "Uppdatera de fält du önskar"
              :
              "Lägg till en ny underkategori. Fyll i alla obligatoriska fält nedan."}
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
                {/* categoryId */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Kategori*</FormLabel>
                      <FormControl>
                        <CategoryCombobox
                          value={field.value}
                          onChange={(newCategoryId) => {
                            field.onChange(newCategoryId);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Underkategorinamn*</FormLabel>
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
                  control={form.control}
                  name="description"
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
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Kategoribild</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value}
                          disabled={loading}
                          onChange={(urls) => field.onChange(urls)}
                          onRemove={(url) => field.onChange(field.value?.filter((current) => current !== url))}
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
            {
              category &&
              <Button
                className="h-11 px-8 text-base flex gap-1"
                variant={"destructive"}
                onClick={() => handleDeleteCategory(category)}>
                <Trash2 />
                Radera
              </Button>
            }
            {/* onSubmit */}
            <Button
              type="submit"
              form="create-product-form"
              disabled={loading}
              className="h-11 px-8 text-base">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {category ? "Uppdaterar" : "Skapar"} kategori...
                </>
              ) : (
                <>
                  {category ? "Uppdaterar" : "Skapar"} kategori
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
