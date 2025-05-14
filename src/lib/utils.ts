import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Swedish currency
export function formatPrice(price: number) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price);
}

export function capitalize(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD") // Normalisera accenter och specialtecken
    .replace(/[\u0300-\u036f]/g, "") // Ta bort diakritiska tecken
    .replace(/[^a-z0-9 ]/g, "") // Ta bort allt som inte är bokstäver, siffror eller mellanslag
    .trim()
    .replace(/\s+/g, "-"); // Ersätt mellanslag med bindestreck
};

export function capitalizeFirstLetter(str: string | undefined) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}