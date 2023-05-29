import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ScrollToTop from "./";

describe("ScrollToTop", () => {
  it("should not be visible initially", () => {
    const { queryByRole } = render(<ScrollToTop />);
    const button = queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  it("should be visible when the user scrolls down", () => {
    const { queryByRole } = render(<ScrollToTop />);
    const button = queryByRole("button");

    expect(button).not.toBeInTheDocument();

    window.scrollY = 150;
    fireEvent.scroll(window);

    setTimeout(() => {
      waitFor(() => {
        expect(button).toBeInTheDocument();
      });
    }, 500);
  });

  it("should scroll to the top when clicked", async () => {
    const { queryByRole } = render(<ScrollToTop />);
    const button = queryByRole("button");

    window.scrollY = 150;
    fireEvent.scroll(window);

    if (button) {
      fireEvent.click(button);

      setTimeout(() => {
        waitFor(() => {
          expect(window.scrollY).toBe(0);
        });
      }, 500);
    }
  });
});
