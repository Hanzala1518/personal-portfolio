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

const baseClass = "inline-flex items-center justify-center rounded-md font-mono uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix-green"

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-matrix-green text-matrix-black shadow-glow hover:bg-matrix-cyan",
  secondary: "bg-matrix-dark/80 text-matrix-white border border-matrix-green/40 hover:border-matrix-green/80",
  ghost: "bg-transparent border border-transparent text-matrix-grey hover:text-matrix-white hover:border-matrix-green/40",
  outline: "border border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10"
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
