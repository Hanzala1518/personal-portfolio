import { cn } from "@/lib/utils/cn"

interface LoadingSpinnerProps {
  className?: string
  label?: string
}

export default function LoadingSpinner({ className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center gap-3 text-matrix-green", className)} role="status" aria-live="polite">
      <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-matrix-green border-t-transparent" />
      {label ? <span className="font-mono text-xs uppercase tracking-[0.3em]">{label}</span> : null}
    </div>
  )
}
