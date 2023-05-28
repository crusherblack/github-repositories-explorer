import React from "react";
import { render, screen } from "@testing-library/react";

import Input from "./";

describe("Input", () => {
  const label = "Search";
  const placeholder = "Enter search term";

  it("renders correctly", () => {
    render(<Input aria-label={label} placeholder={placeholder} />);

    const inputElement = screen.getByPlaceholderText(placeholder);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("aria-label", label);
    expect(inputElement).toHaveClass(
      "w-full form-input dark:bg-gray-900 rounded-md border-none"
    );
    expect(inputElement.parentElement).toHaveClass(
      "bg-gradient-to-r from-blue-600 to-teal-400 rounded-md p-[2px]"
    );
  });
});
