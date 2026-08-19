import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx(
        "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-black",
        className
      )}
      {...props}
    />
  );
};

export default Input;