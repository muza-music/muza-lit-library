import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addToLibrary() {
  toast("Album added succssefuly to your library", {
    position: "bottom-center",
    hideProgressBar: true,
  });
}
