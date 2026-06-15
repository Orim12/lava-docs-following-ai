import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
