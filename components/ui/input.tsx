import { forwardRef } from "react"
import type { ForwardedRef, InputHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "ghost"
  className?: string
}

const baseClass = "w-full rounded-md border border-matrix-green/30 bg-matrix-dark/70 px-3 py-2 text-sm text-matrix-white placeholder:text-matrix-grey/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix-green"

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant = "default", ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const variantClass = variant === "ghost" ? "bg-transparent border-matrix-green/20" : ""
  return <input ref={ref} className={cn(baseClass, variantClass, className)} {...props} />
})
