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
import { CategoryCombobox } from "@/components/admin/category-combobox";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { CreateProductSubCategoryDrowpdown } from "./create-product-subcategory-dropdown";
import { ProductAttributesList } from "./product-attributes-list ";
import { ProductSpecificationsList } from "./product-specifications-list";
import { useCategories } from "@/hooks/use-categories";
import { capitalizeFirstLetter } from "@/lib/utils";

const productFormSchema = z.object({
  name: z.string().min(1, "Namn krävs"),
  vendor: z.string().min(1, "Varumärke krävs"),
  tagline: z.string(),
  description: z.string().min(1, "Beskrivning krävs"),
  productAttributes: z.array(z.string()),
  productSpecifications: z.array(z.string()),
  price: z.coerce
    .number()
    .min(0, "Priset måste vara större än 0")
    .transform((val) => Number(val.toFixed(2))),
  images: z.array(z.string()).min(1, "Minst en bild krävs"),
  stock: z.coerce.number().int().min(0, "Lager måste vara större än eller lika med 0"),
  categoryId: z.string().min(1, "Kategori krävs"),
  subCategoryId: z.string(),
});

type ProductFormValues = z.infer<typeof productFormSchema>; type StringArrayKeys<T> = {
  [K in keyof T]: T[K] extends string[] ? K : never;
}[keyof T];

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ open, onOpenChange }: ProductDialogProps) {
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProducts();
  const { categories } = useCategories();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      vendor: "",
      tagline: "",
      description: "",
      productAttributes: [""],
      productSpecifications: [""],
      price: 0,
      images: [],
      stock: 0,
      categoryId: "",
      subCategoryId: "",
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setLoading(true);
    try {
      const currentCategory = categories?.find((c) => (c.id === data.categoryId));
      if (currentCategory?.subCategories.length && data.subCategoryId === '') {
        toast.error("Denna kategori har redan underkategorier, då behöver du tilldela din nya produkt en underkategori!")
        return
      }
      const filteredAttributes = data.productAttributes.filter(attr => attr.trim() !== "").map(capitalizeFirstLetter);
      const filteredSpecifications = data.productSpecifications.filter(spec => spec.trim() !== "").map(capitalizeFirstLetter);
      const descriptions = data.description.split('\n').filter(line => line.trim() !== "").map(capitalizeFirstLetter)

      const finalData = {
        ...data,
        name: capitalizeFirstLetter(data.name),
        vendor: capitalizeFirstLetter(data.vendor),
        tagline: capitalizeFirstLetter(data.tagline),
        description: descriptions,
        productAttributes: filteredAttributes,
        productSpecifications: filteredSpecifications,
        price: data.price.toFixed(2),
        subCategoryId: form.watch('subCategoryId'),
      };
      console.log('finalData: ', finalData)
      await createProduct.mutateAsync(finalData);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Misslyckades att skapa produkt");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold">Ny produkt</DialogTitle>
          <DialogDescription className="text-base">
            Lägg till en ny produkt i din butik. Fyll i alla obligatoriska fält
            nedan.
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
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Produktnamn*</FormLabel>
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

                {/* vendor */}
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Varumärke*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ange varumärke"
                          className="h-11 text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* tagline */}
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Säljande text / Underrubrik</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Valfri text"
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
                      <FormLabel className="text-base">Beskrivning*</FormLabel>
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

                {/* productAttributes Punktlista */}
                <ProductAttributesList />

                {/* productSpecifications Punktlista */}
                <ProductSpecificationsList />


                <div className="grid grid-cols-2 gap-6">
                  {/* price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Pris*</FormLabel>
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

                  {/* stock */}
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Lager*</FormLabel>
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
                            form.setValue("subCategoryId", "");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* subCategoryId */}
                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Underkategori</FormLabel>
                      <FormControl>
                        <CreateProductSubCategoryDrowpdown
                          value={field.value}
                          onChange={field.onChange}
                          selectedCategoryId={form.watch('categoryId')}
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
                      <FormLabel className="text-base">Produktbilder</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || []}
                          disabled={loading}
                          onChange={(urls) => field.onChange(urls)}
                          onRemove={(url) => field.onChange(field.value?.filter((current) => current !== url))}
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

        {/* onSubmit */}
        <DialogFooter className="pt-4">
          <Button
            type="submit"
            form="create-product-form"
            disabled={loading}
            className="h-11 px-8 text-base">
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
      </DialogContent>
    </Dialog>
  );
}
