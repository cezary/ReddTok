import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWithinThreshold(num: number, target: number, threshold:number=1): boolean {
  return Math.abs(num - target) <= threshold;
}

export function formatNumber(num: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num).toLowerCase();
}