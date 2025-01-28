import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  countryData: null,
  loading: false,
  error: null,
  lastUpdated: null,
  __debug: {
    lastAction: null,
    receivedCountries: [],
  },
};

const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {
    fetchCountriesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess: (state, action) => {
      state.countries = action.payload;
      state.__debug.receivedCountries = action.payload; // Debug data
      state.loading = false;
    },
    fetchCountryStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCountrySuccess: (state, action) => {
      state.countryData = action.payload;
      state.loading = false;
      state.lastUpdated = Date.now();
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.lastUpdated = Date.now();
    },
  },
});

export const {
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountryStart,
  fetchCountrySuccess,
  fetchFailure,
} = covidSlice.actions;

export default covidSlice.reducer;
