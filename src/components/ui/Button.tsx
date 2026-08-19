import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out",

        variant === "primary" &&
          "bg-black text-white hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:translate-y-0 active:scale-100",

        variant === "secondary" &&
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg active:translate-y-0",

        variant === "ghost" &&
          "text-gray-700 hover:bg-gray-100",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;