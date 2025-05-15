"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { default as NextImage } from "next/image";
import { ImageIcon, Loader2, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ConfigurationImage {
  dimensions: {
    height: number;
    width: number;
  };
  htmlElement: HTMLImageElement;
  url: string;
}

interface ImageUploadProps {
  value: string[];
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  selectChange?: (configImage: ConfigurationImage) => void;
  maxFiles?: number;
}

export function ImageUpload({
  value = [],
  disabled,
  onChange,
  onRemove,
  selectChange,
  maxFiles = 5,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {},
  );

  const handleImageChange = (url: string) => {
    console.log('handleImageChange clicked!')
    // If we have a new image, load it
    if (url) {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (selectChange)
          selectChange({
            dimensions: {
              height: img.height,
              width: img.width,
            },
            htmlElement: img,
            url: url,
          });
      };
    }
  };

  /* IMPORT IMAGE WITH DRAG AND DROP */
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxFiles - value.length;

      if (remainingSlots <= 0) {
        toast.error(`Du kan bara ladda upp upp till ${maxFiles} bilder`);
        return;
      }

      // Take only the number of files that will fit within the limit
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      if (acceptedFiles.length > remainingSlots) {
        toast.warning(
          `Endast ladda upp första ${remainingSlots} bild${remainingSlots > 1 ? "er" : ""} för att hålla dig inom gränsen på ${maxFiles}`,
        );
      }

      setLoading(true);
      const newUploadProgress: Record<string, number> = {};
      filesToUpload.forEach((file) => {
        newUploadProgress[file.name] = 0;
      });
      setUploadProgress(newUploadProgress);

      try {
        const uploadPromises = filesToUpload.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/admin/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const data = await response.json();
          // Simulate upload progress
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
          return data.url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        onChange([...value, ...uploadedUrls]);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Det gick inte att ladda upp en eller flera bilder");
      } finally {
        setLoading(false);
        setUploadProgress({});
      }
    },
    [value, onChange, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    disabled: disabled || loading,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "relative rounded-lg border-2 border-dashed transition-colors duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          "hover:border-primary/50 hover:bg-primary/5",
        )}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <UploadCloud className="h-10 w-10 text-muted-foreground/50 mb-4" />
          <div className="text-sm">
            <p className="font-medium text-muted-foreground mb-1">
              {isDragActive ? (
                "Släpp bilderna här"
              ) : (
                <>
                  Dra och släpp bilder eller{" "}
                  <span className="text-primary">välj filer</span>
                </>
              )}
            </p>
            <p className="text-xs text-muted-foreground/75">
              Format som stöds: PNG, JPG, JPEG, GIF, WebP
              {` • ${value.length}/${maxFiles} ${maxFiles > 1 ? "bilder" : "bild"}`}
            </p>
          </div>
        </div>
        {disabled && (
          <div className="absolute inset-0 bg-background/50 rounded-lg flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Uppladdning inaktiverad
            </p>
          </div>
        )}
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div
              key={fileName}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="flex-1 truncate">{fileName}</span>
              <span>{progress}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div
              key={url}
              onClick={() => handleImageChange(url)}
              className="group/item relative aspect-[4/3] rounded-lg overflow-hidden bg-muted cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2 ring-offset-background">
              <NextImage
                fill
                src={url}
                alt={`Uppladdad bild ${index + 1}`}
                className="object-cover transition-all duration-200 group-hover/item:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-20 h-7 w-7 opacity-0 group-hover/item:opacity-100 transition-all duration-200 shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(url);
                }}>
                <X className="h-4 w-4" />
              </Button>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
            </div>
          ))}

          {/* Empty Slots */}
          {value.length < maxFiles &&
            Array.from({ length: maxFiles - value.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="aspect-[4/3] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/5"
              >
                <ImageIcon className="h-8 w-8 text-muted-foreground/25" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
