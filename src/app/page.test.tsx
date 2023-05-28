import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { ReposResponse, useGetGithubUsersMutation } from "@/services/github";
import Hero from "@/components/hero";

import { createApi } from "@reduxjs/toolkit/query/react";
import { waitMs } from "@/utils/helper";

jest.mock("@/services/github");

const mockStore = configureStore([]);

const api = createApi({
  baseQuery: async (arg: any) => {
    await waitMs();
    return {
      data: {},
    };
  },
  endpoints: (build) => ({
    getGithubUserRepositories: build.query<ReposResponse, string>({
      query: () => ({
        params: {
          username: "",
        },
      }),
    }),
  }),
});

describe("Hero", () => {
  let store: MockStoreEnhanced<unknown, {}> = mockStore({});
  let component = render(<></>);

  beforeEach(() => {
    store = mockStore({
      github: {
        githubUsers: [],
      },
    });

    component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );
  });

  it("renders without errors", () => {
    expect(component).toBeDefined();
  });

  it("displays the input field with a placeholder text", () => {
    const input = component.getByPlaceholderText("e.g: crusherblack");
    expect(input).toBeInTheDocument();
  });

  it("displays the Lottie animation", () => {
    const animation = component.container.querySelector(".lottie-container");
    expect(animation).toBeInTheDocument();
  });

  it("calls the onSubmit function when the Enter key is pressed", async () => {
    const input = component.getByPlaceholderText("e.g: crusherblack");

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const { isFetching } =
      api.endpoints.getGithubUserRepositories.useQuery("crusherblack");
  });

  it("calls the useGetGithubUsersMutation hook with the correct input value", async () => {
    const input = component.getByPlaceholderText("e.g: crusherblack");

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
  });

  it("displays the loading animation when isLoading state is true", () => {
    const component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    const animation = component.container.querySelector(".lottie-container");
    expect(animation).toHaveAttribute("data-animation-path", "loading.json");
  });

  it("displays the not-found animation when API response has zero items", async () => {
    const component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    const animation = component.container.querySelector(".lottie-container");
    expect(animation).toHaveAttribute("data-animation-path", "not-found.json");
  });

  it("displays the hero animation when API response has one or more items", async () => {
    const component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    const animation = component.container.querySelector(".lottie-container");
    expect(animation).toHaveAttribute("data-animation-path", "hero.json");
  });

  it("updates the setError state when there's an error in the API response", async () => {
    const component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    const input = component.getByPlaceholderText("e.g: crusherblack");

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    await waitFor(() =>
      expect(component.getByText("Test error message")).toBeInTheDocument()
    );
  });

  it("dispatches the setCurrentGithubUsernames action with the correct data", async () => {
    const component = render(
      <Provider store={store}>
        <Hero />
      </Provider>
    );

    const input = component.getByPlaceholderText("e.g: crusherblack");

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    await waitFor(() =>
      expect(store.getActions()).toEqual([
        {
          type: "github/setCurrentGithubUsernames",
          payload: [{ login: "testuser" }],
        },
      ])
    );
  });
});
