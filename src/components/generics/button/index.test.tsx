import { render, fireEvent } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );
    fireEvent.click(getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables the button when loading prop is true", () => {
    const { getByText } = render(<Button loading>Click me</Button>);
    expect(getByText("Click me")).toBeDisabled();
  });

  it("disables the button when disabled prop is true", () => {
    const { getByText } = render(<Button disabled>Click me</Button>);
    expect(getByText("Click me")).toBeDisabled();
  });

  it("renders an icon when passed an icon prop", () => {
    const { getByTestId } = render(
      <Button icon={<i data-testid="icon" />}>Click me</Button>
    );
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a large button when size prop isset to 'large'", () => {
    const { getByText } = render(<Button size="large">Click me</Button>);
    expect(getByText("Click me")).toHaveClass("px-5 py-3 text-base");
  });

  it("renders a regular button when size prop is set to 'regular'", () => {
    const { getByText } = render(<Button size="regular">Click me</Button>);
    expect(getByText("Click me")).toHaveClass("px-4 py-2 text-sm");
  });

  it("renders a small button when size prop is set to 'small'", () => {
    const { getByText } = render(<Button size="small">Click me</Button>);
    expect(getByText("Click me")).toHaveClass("px-2 py-2");
  });

  it("renders a regular button variant when variant prop is not set", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toHaveClass(
      "bg-brand text-white hover:bg-brand-dark disabled:hover:bg-brand"
    );
  });

  it("renders an outline button variant when variant prop is set to 'outline'", () => {
    const { getByText } = render(<Button variant="outline">Click me</Button>);
    expect(getByText("Click me")).toHaveClass(
      "border border-brand text-brand hover:border-brand-dark hover:bg-brand-light disabled:border-brand disabled:bg-transparent"
    );
  });

  it("renders a ghost button variant when variant prop is set to 'ghost'", () => {
    const { getByText } = render(<Button variant="ghost">Click me</Button>);
    expect(getByText("Click me")).toHaveClass(
      "text-brand hover:bg-brand-light disabled:hover:bg-transparent"
    );
  });

  it("renders a link button variant when variant prop is set to 'link'", () => {
    const { getByText } = render(<Button variant="link">Click me</Button>);
    expect(getByText("Click me")).toHaveClass(
      "text-brand hover:underline disabled:no-underline"
    );
  });

  it("adds className prop to the button", () => {
    const { getByText } = render(
      <Button className="custom-classname">Click me</Button>
    );
    expect(getByText("Click me")).toHaveClass("custom-classname");
  });
});
