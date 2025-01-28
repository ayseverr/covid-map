import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import covidReducer from "./features/covid/covidSlice"; // Gerçek reducer'ı bağla
import App from "./App";

// no touch to css file
jest.mock("bootstrap/dist/css/bootstrap.min.css", () => ({}));

describe("App component", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        covid: covidReducer, // connect real reducer
      },
      preloadedState: {
        covid: {
          countries: [{ iso: "USA" }, { iso: "TUR" }],
          loading: false, // for dont stuck with loading
          error: null,
        },
      },
    });
  });

  test("renders world map header", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const headerElement = await screen.findByText(/COVID-19 World Map/i);
    expect(headerElement).toBeInTheDocument();
  });
});
