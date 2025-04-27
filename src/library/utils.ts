import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cutByLength = (string: string, length: number, dots = '..') => {
  return string.length > length ? `${string.slice(0, length)}${dots}` : string
}

export const nameToLabel = (string: string) => {
  return capitalizeFirstLetter(string.replace(/([a-z])([A-Z])/g, '$1 $2'))
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
