import React, { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: Props) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-teal-400 rounded-md p-[2px]">
      <input
        className="w-full form-input dark:bg-gray-900  rounded-md border-none"
        {...props}
      />
    </div>
  );
};

export default Input;
