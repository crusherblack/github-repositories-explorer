import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./";

describe("Select", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("should render the placeholder", () => {
    const placeholder = "Select an option";
    const { getByText } = render(
      <Select placeholder={placeholder} options={options} />
    );
    expect(getByText(placeholder)).toBeInTheDocument();
  });

  it("should render the options", () => {
    const { getByText } = render(<Select options={options} />);
    options.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  it("should call onChange handler when an option is selected", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <Select
        placeholder="Select an option"
        options={options}
        onChange={onChange}
      />
    );
    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "option2" }),
      })
    );
  });

  it("should apply custom class name to container", () => {
    const className = "custom-class";
    const { container } = render(
      <Select className={className} options={options} />
    );
    expect(container.firstChild).toHaveClass(className);
  });
});
