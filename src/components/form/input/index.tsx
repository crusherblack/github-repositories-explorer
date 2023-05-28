import clsx from "clsx";
import React, { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  const { className } = props;

  return (
    <div
      className={clsx(
        "bg-gradient-to-r from-blue-600 to-teal-400 rounded-md p-[2px]",
        className
      )}
    >
      <input
        {...props}
        className="w-full form-input dark:bg-gray-900  rounded-md border-none"
      />
    </div>
  );
};

export default Input;
