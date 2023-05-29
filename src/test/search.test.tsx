import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "@/app/page";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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

  const { getByText, getByRole, queryByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const input = getByRole("textbox");
  const button = getByRole("button", {
    name: /search user/i,
  });

  fireEvent.change(input, { target: { value: "bruhHackin" } });
  fireEvent.click(button);
  await waitFor(() => {
    expect(getByText(/searching\.\.\./i)).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(getByText(/\{"message":"server error"\}/i)).toBeInTheDocument();
  });

  expect(queryByText(/searching\.\.\./i)).not.toBeInTheDocument();
});
