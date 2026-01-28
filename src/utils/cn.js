import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Spája CSS triedy pomocou clsx a rieši konflikty Tailwind tried cez tailwind-merge.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
