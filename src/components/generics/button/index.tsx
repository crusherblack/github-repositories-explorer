import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";
import Spinner from "@/components/generics/spinner";

type buttonVariant = "regular" | "outline" | "ghost" | "link";
type buttonSize = "regular" | "large" | "small";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  children: ReactNode;
  loading?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
}

const Button = ({
  size = "regular",
  variant = "regular",
  children,
  className,
  loading,
  icon,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "h-fit w-fit rounded-lg text-xs font-medium transition-all flex items-center justify-center",
        "disabled:cursor-not-allowed disabled:opacity-50",
        size === "large" && "px-5 py-3 text-base",
        size === "regular" && "px-4 py-2 text-sm",
        size === "small" && "px-2 py-2",
        variant === "regular" &&
          "bg-brand text-white hover:bg-brand-dark disabled:hover:bg-brand",
        variant === "outline" &&
          "border border-brand text-brand hover:border-brand-dark hover:bg-brand-light disabled:border-brand disabled:bg-transparent",
        variant === "ghost" &&
          "text-brand hover:bg-brand-light disabled:hover:bg-transparent",
        variant === "link" &&
          "text-brand hover:underline disabled:no-underline",
        loading && "opacity-50 cursor-not-allowed",
        icon && "mr-2",
        className
      )}
      {...props}
      disabled={loading || disabled}
    >
      {true && <Spinner />}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;
