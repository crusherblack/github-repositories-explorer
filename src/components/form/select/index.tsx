import { type SelectHTMLAttributes } from "react";

import clsx from "clsx";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select = (props: Props) => {
  const { placeholder, options, className } = props;

  return (
    <div
      className={clsx(
        "bg-gradient-to-r from-blue-600 to-teal-400 rounded-md p-[2px]",
        className
      )}
    >
      <select
        {...props}
        className="w-full form-input dark:bg-gray-900  rounded-md border-none"
      >
        <option value="" selected disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
