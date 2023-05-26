import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Accordion from ".";

const testAccordionData = [
  {
    id: "1",
    header: <div>Header 1</div>,
    content: <div>Content 1</div>,
  },
  {
    id: "2",
    header: <div>Header 2</div>,
    content: <div>Content 2</div>,
  },
];

describe("Accordion", () => {
  it("renders correctly with no data source", () => {
    render(<Accordion />);
    expect(screen.queryByText("Header 1")).not.toBeInTheDocument();
  });

  it("renders correctly with data source", () => {
    render(<Accordion datasource={testAccordionData} />);
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
  });

  it("displays content when header is clicked", async () => {
    render(<Accordion datasource={testAccordionData} />);
    const header1 = screen.getByText("Header 1");

    await userEvent.click(header1);

    await waitFor(() => {
      expect(screen.getByText("Content 1")).toBeVisible();
    });
  });

  it("hides content when header is clicked again", async () => {
    render(<Accordion datasource={testAccordionData} />);
    const header1 = screen.getByText("Header 1");

    await userEvent.click(header1);

    await waitFor(() => {
      expect(screen.getByText("Content 1")).toBeVisible();
    });

    await userEvent.click(header1);

    await waitFor(() => {
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });
});
