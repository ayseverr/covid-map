import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Map from "./Map";

// Mock Redux Store
const mockStore = configureStore([]);

describe("Map Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      covid: {
        countries: [{ iso: "USA" }, { iso: "TUR" }],
        loading: false,
        error: null,
      },
    });
  });

  test("renders map and header", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Map />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/COVID-19 World Map/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Click on any country to view detailed statistics/i)
    ).toBeInTheDocument();
  });

  test("displays loading spinner when loading", () => {
    store = mockStore({
      covid: {
        countries: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Map />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading countries.../i)).toBeInTheDocument();
  });

  test("displays error message when an error occurs", () => {
    store = mockStore({
      covid: {
        countries: [],
        loading: false,
        error: "Failed to fetch data",
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Map />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/Error: Failed to fetch data/i)
    ).toBeInTheDocument();
  });
});
