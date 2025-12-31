import { forwardRef } from "react"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils/cn"

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline"
type ButtonSize = "sm" | "md" | "lg" | "icon"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  children?: React.ReactNode
}

const baseClass = "inline-flex items-center justify-center rounded-md font-mono uppercase tracking-wider transition-all duration-300 ease-out transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix-green active:scale-[0.98]"

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-matrix-green text-white shadow-glow hover:bg-matrix-cyan hover:shadow-[0_0_25px_rgba(255,56,56,0.4)] hover:-translate-y-0.5",
  secondary: "bg-matrix-navy/30 text-matrix-white border border-matrix-green/40 hover:border-matrix-green/80 hover:bg-matrix-navy/50 hover:-translate-y-0.5",
  ghost: "bg-transparent border border-transparent text-matrix-grey hover:text-matrix-white hover:border-matrix-green/40 hover:bg-matrix-green/5",
  outline: "border border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green/70 hover:-translate-y-0.5"
}

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "h-9 w-9"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", asChild, children, ...props }: ButtonProps,
  ref
) {
  // If asChild is true, just pass the className to the child
  if (asChild && children) {
    const child = children as React.ReactElement
    return (
      <child.type
        {...child.props}
        className={cn(baseClass, variantClass[variant], sizeClass[size], className, child.props.className)}
      />
    )
  }

  return (
    <button
      ref={ref}
      className={cn(baseClass, variantClass[variant], sizeClass[size], className)}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"
