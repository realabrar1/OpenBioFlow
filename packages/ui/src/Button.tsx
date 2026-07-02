import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none px-4 py-2.5",
          variant === "primary" && "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-95 shadow-lg shadow-indigo-500/10",
          variant === "secondary" && "bg-slate-800 text-slate-100 hover:bg-slate-700",
          variant === "outline" && "border border-slate-800 bg-transparent text-slate-300 hover:bg-slate-900/50 hover:text-white",
          variant === "ghost" && "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
