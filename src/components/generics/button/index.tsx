import { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

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
      {loading && (
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0Continuation:

          5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm9.695.75l3-2.646A7.962 7.962 0 0020 12h-4a4.001 4.001 0 01-6.305 3.291z"
          ></path>
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </button>
  );
};

export default Button;
