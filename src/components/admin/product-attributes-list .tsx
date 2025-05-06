import { useFieldArray, useFormContext } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";

export const ProductAttributesList = () => {
    const { control, register } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "productAttributes",
    });

    return (
        <div>
            <FormLabel className="text-base mb-2 block">Punktlista Attribut</FormLabel>
            {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                    <Input
                        placeholder={`Punkt ${index + 1}`}
                        className="h-11 text-base"
                        {...register(`productAttributes.${index}` as const)}
                    />
                    {fields.length > 1 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ))}

            <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append("")}
            >
                <Plus className="h-4 w-4 mr-2" /> Lägg till punkt
            </Button>
        </div>
    );
};
