import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

// Shared visual variants keep landing CTAs and header actions consistent.
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-slate-950 text-white shadow-sm shadow-slate-900/20 hover:bg-slate-800 focus-visible:outline-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
  secondary:
    "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-700 dark:text-slate-200 dark:hover:bg-white/10",
  light:
    "bg-white text-slate-950 hover:bg-slate-100 focus-visible:outline-white",
};

// Size tokens preserve predictable button heights across dense nav and larger CTA areas.
const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Native button variant for form actions and future authenticated flows.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Link-styled button used for landing-page anchors and Next.js client navigation.
type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
