import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "@/app/page";
import { fireEvent, waitFor } from "@testing-library/react";
import { reposReponse, userResponse } from "./dummyResponse";
import { renderWithProviders } from "@/utils/renderWithProvider";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("app should display an error when the request fail", async () => {
  server.use(
    rest.post("/api/github/search", (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({
          message: "Server Error",
        })
      );
    })
  );

  const { getByText, getByRole, queryByText } = renderWithProviders(<Home />);

  const input = getByRole("textbox");
  const button = getByRole("button", {
    name: /search user/i,
  });

  fireEvent.change(input, { target: { value: "lastein" } });
  fireEvent.click(button);
  await waitFor(() => {
    expect(getByText(/searching\.\.\./i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(getByText(/\{"message":"server error"\}/i)).toBeInTheDocument();
  });

  expect(queryByText(/searching\.\.\./i)).not.toBeInTheDocument();
});

test("app should display list github user based on search query", async () => {
  const handlers = [
    rest.post("/api/github/search", (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json(userResponse));
    }),
    rest.get("/api/github/repos", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(reposReponse));
    }),
  ];

  server.use(...handlers);

  const { getByText, getByRole, queryByText, container } = renderWithProviders(
    <Home />
  );

  const input = getByRole("textbox");
  const button = getByRole("button", {
    name: /search user/i,
  });

  fireEvent.change(input, { target: { value: "lastein" } });
  fireEvent.click(button);
  await waitFor(() => {
    expect(getByText(/searching\.\.\./i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(queryByText(/searching\.\.\./i)).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      getByRole("button", {
        name: /Lasteinsa/i,
      })
    ).toBeInTheDocument();
  });

  const resultContainer = container.querySelector("#result-container");

  expect(resultContainer).toBeInTheDocument();
  expect(resultContainer?.children.length).toBe(5);
});
