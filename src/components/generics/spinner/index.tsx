import clsx from "clsx";
import React, { type SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Spinner = (props: Props) => {
  return (
    <svg
      {...props}
      className={clsx("animate-spin h-5 w-5 mr-3", props.className)}
      viewBox="0 0 24 24"
    >
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
        d="M4 12a8 8 0 018-8V0C5.373 0 05.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm9.695.75l3-2.646A7.962 7.962 0 0020 12h-4a4.001 4.001 0 01-6.305 3.291z"
      ></path>
    </svg>
  );
};

export default Spinner;
